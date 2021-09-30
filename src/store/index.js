import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        activeTeamId: 1,
        editingTeamId: false,
        editingPlayerId: false,
        teams: [
            {
                id: 1,
                name: 'Real Madrid',
                roster: [
                    {
                        id: 1,
                        name: 'Benzema',
                    },
                    {
                        id: 2,
                        name: 'Bale',
                    },
                    {
                        id: 3,
                        name: 'Vinicius Jr',
                    }
                ]
            },
            {
                id: 2,
                name: 'PSG',
                roster: [
                    {
                        id: 1,
                        name: 'Benzema',
                    },
                    {
                        id: 2,
                        name: 'Bale',
                    },
                    {
                        id: 3,
                        name: 'Vinicius Jr',
                    }
                ]
            },
            {
                id: 3,
                name: 'Manchester City',
                roster: [
                    {
                        id: 1,
                        name: 'Benzema',
                    },
                    {
                        id: 2,
                        name: 'Bale',
                    },
                    {
                        id: 3,
                        name: 'Vinicius Jr',
                    }
                ]
            },
        ],
    },
    mutations: {
        set(state, {type, items}) {
            state[type] = items
        }
    },
    actions: {
        openItem({commit}, id) {
            commit('set', {type: 'activeTeamId', items: (id === this.state.activeTeamId) ? false : id});
        },
        setEditEnable({commit}, params){
            switch (params.type){
                case 'team': {
                    commit('set', {type: 'editingTeamId', items: true});
                    break;
                }
                case 'player': {
                    commit('set', {type: 'editingPlayerId', items: true});
                    break;
                }
                default:{
                    throw new Error('Не передан тип "team" или "player"');
                }
            }
        },
        deleteTeam({commit, state}, deletingTeamId) {
            let arrTeams = state.teams;
            let success = false;
            arrTeams.find((team, index) => {
                if (team.id === deletingTeamId) {
                    // если удаляемая команда сейчас открыта - закрываем коллапс
                    if (team.id === this.state.activeTeamId) commit('set', {type: 'activeTeamId', items: false});
                    arrTeams.splice(index, 1);
                    success = true;
                    return true;
                }
            });
            if (success) {
                commit('set', {type: 'teams', items: arrTeams});
            } else {
                throw new Error('Команды по переданному параметру "id" не найдено');
            }
        },
        deletePlayer({commit, state}, params) {
            let arrTeams = state.teams;
            let success = false;
            arrTeams.find((team, index) => {
                if (team.id === params.teamId) {
                    arrTeams[index].roster.find((player, playerIndex) => {
                        if (player.id === params.playerId) {
                            arrTeams[index].roster.splice(playerIndex, 1);
                            success = true;
                            return true;
                        }
                    });
                }
            });
            if (success) {
                commit('set', {type: 'teams', items: arrTeams});
            } else {
                throw new Error('Игрока по переданным параметрам "playerId" и "teamId" не найдено');
            }
        }
    },
})
