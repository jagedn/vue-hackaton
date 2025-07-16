// Utilities
import {generateName} from '@criblinc/docker-names'
import { defineStore } from 'pinia'

const odd = '#7d7db3';
const even = '#c92729';

const bgodd = '#f7aab3';
const bgeven = '#b7acb3';

const participants = ref([])

const groups = ref([])

const winners = ref([])


export const useAppStore = defineStore('app', () => {

  function removeParticipant(p:never) {
    participants.value = participants.value.filter(function(e) {
      return e.id !== p.id
    })
  }

  function addWinner(p:never) {
    removeParticipant(p)
    winners.value.push(p)
    const g = pickOneGroup()
    g.participants.push(p)
  }

  function add(l:never){
    const idx = participants.value.length;
    participants.value.push({ id: idx, value: l.trim(), bgColor: idx%2==0?bgeven:bgodd, color: idx%2==0?even:odd }as never)
  }

  function reset(){
    participants.value = []
    winners.value = []
    groups.value = []
    setGroups(2)
  }

  const pickOne = computed(()=>{
    return Math.floor(Math.random() * participants.value.length) + 1
  })

  const pickOneGroup = ()=>{
    return groups.value.sort((a, b) => a.participants.length - b.participants.length)[0]
  }

  function setGroups(n:number){
    groups.value = []
    for(let i=0; i<n; i++){
      const dockerName = generateName().split("-")[0];
      groups.value.push({name:dockerName, participants:[]} as never)
    }
    for(let w=0; w<winners.value.length; w++){
      participants.value.push(winners.value[w])
    }
    winners.value = []
  }

  setGroups(2);
  add("Dummy")

  return { participants, groups, winners, addWinner, removeParticipant, pickOne, add, reset, setGroups }
});
