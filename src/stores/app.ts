// Utilities
import { defineStore } from 'pinia'

const odd = '#7d7db3';
const even = '#c92729';

const bgodd = '#f7aab3';
const bgeven = '#b7acb3';

export const useAppStore = defineStore('app', () => {

  const participants = ref([
    { id: -1, value: 'Ejemplo', bgColor: '#7d7db3', color: '#ffffff' },
  ])

  const groups = ref([])

  const winners = ref([])

  function removeParticipant(p:never) {
    participants.value = participants.value.filter(function(e) {
      return e.id !== p.id
    })
  }

  function addWinner(p:never) {
    removeParticipant(p)
    winners.value.push(p)
    const g = pickOneGroup()
    console.log(g)
    g.participants.push(p)
  }

  function add(l:never){
    const idx = participants.value.length;
    participants.value.push({ id: idx, value: l.trim(), bgColor: idx%2==0?bgeven:bgodd, color: idx%2==0?even:odd }as never)
  }

  function reset(){
    participants.value = []
    winners.value = []
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
      groups.value.push({name:"Grupo "+(i+1), participants:[]} as never)
    }
    for(let w=0; w<winners.value.length; w++){
      participants.value.push(winners.value[w])
    }
    winners.value = []
  }

  setGroups(2);

  return { participants, groups, winners, addWinner, removeParticipant, pickOne, add, reset, setGroups }
});
