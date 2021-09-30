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
                        name: 'Karim Benzema',
                        position: 'FWD',
                        age: '33',
                    },
                    {
                        id: 2,
                        name: 'Gareth Bale',
                        position: 'FWD',
                        age: '32',
                    },
                    {
                        id: 3,
                        name: 'Vinícius Júnior',
                        position: 'FWD',
                        age: '21',
                    },
                    {
                        id: '4',
                        name: 'Luka Modrić ',
                        position: 'MDF',
                        age: '36',
                    },
                    {
                        id: '5',
                        name: 'Toni Kroos',
                        position: 'MDF',
                        age: '31',
                    },
                    {
                        id: '6',
                        name: 'Federico Valverde',
                        position: 'MFD',
                        age: '23',
                    },
                    {
                        id: '7',
                        name: 'Marcelo',
                        position: 'LFD',
                        age: '33',
                    },
                    {
                        id: '8',
                        name: 'Nacho',
                        position: 'MDF',
                        age: '31',
                    },
                    {
                        id: '9',
                        name: 'Thibaut Courtois',
                        position: 'GK',
                        age: '29',
                    },
                ]
            },
            {
                id: 2,
                name: 'PSG',
                roster: [
                    {
                        id: '1',
                        name: 'Kylian Mbappé',
                        position: 'FWD',
                        age: '22',
                    },
                    {
                        id: '2',
                        name: 'Lionel Messi',
                        position: 'FWD',
                        age: '34',
                    },
                    {
                        id: '3',
                        name: 'Neymar',
                        position: 'FWD',
                        age: '29',
                    },
                    {
                        id: '4',
                        name: 'Keylor Navas',
                        position: 'GK',
                        age: '34',
                    },
                ]
            },
            {
                id: 3,
                name: 'Manchester City',
                roster: [
                    {
                        id: '1',
                        name: 'Ederson',
                        position: 'GK',
                        age: '28',
                    },
                    {
                        id: '2',
                        name: 'Phil Foden',
                        position: 'MDF',
                        age: '21',
                    },
                    {
                        id: '3',
                        name: 'Kevin De Bruyne',
                        position: 'MDF',
                        age: '30',
                    },
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
        setEditEnable({commit}, params) {
            switch (params.type) {
                case "team": {
                    commit('set', {type: 'editingTeamId', items: params.teamId});
                    break;
                }
                case "player": {
                    commit('set', {type: 'editingPlayerId', items: {teamId: params.teamId, playerId: params.playerId}});
                    break;
                }
                default: {
                    throw new Error('Не передан тип "team" или "player"');
                }
            }
        },
        setEditDisable({commit}) {
            commit('set', {type: 'editingTeamId', items: false});
            commit('set', {type: 'editingPlayerId', items: false});
        },
        updateItem({commit, state}, params) {
            switch (params.type) {
                case 'team': {
                    let arrTeams = state.teams;
                    let success = false;
                    arrTeams.find((team, index) => {
                        if (team.id === params.teamId) {
                            arrTeams[index].name = params.name;
                            success = true;
                            return true;
                        }
                    });
                    if (success) {
                        commit('set', {type: 'teams', items: arrTeams});
                        commit('set', {type: 'editingTeamId', items: false});
                        commit('set', {type: 'editingPlayerId', items: false});
                    } else {
                        throw new Error('Команды по переданному параметру "teamId" не найдено');
                    }
                    break;
                }
                case 'player': {
                    let arrTeams = state.teams;
                    let success = false;
                    arrTeams.find((team, index) => {
                        if (team.id === params.teamId) {
                            arrTeams[index].roster.find((player, playerIndex) => {
                                if (player.id === params.playerId) {
                                    arrTeams[index].roster[playerIndex].name = params.name;
                                    arrTeams[index].roster[playerIndex].position = params.position;
                                    arrTeams[index].roster[playerIndex].age = params.age;
                                    success = true;
                                    return true;
                                }
                            });
                        }
                    });
                    if (success) {
                        commit('set', {type: 'teams', items: arrTeams});
                        commit('set', {type: 'editingTeamId', items: false});
                        commit('set', {type: 'editingPlayerId', items: false});
                    } else {
                        throw new Error('Игрока по переданным параметрам "teamId" и "playerId" не найдено');
                    }
                    break;
                }
                default:
                    break;

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
        },
        addTeam({commit, state}, name) {
            let newTeamId = state.teams.reduce((prev, current) => prev.id > current.id ? prev : current, {}).id + 1;
            let newTeam = {
                id: newTeamId,
                name: name,
                roster: []
            }
            let arrTeams = state.teams;
            arrTeams.push(newTeam);
            commit('set', {type: 'teams', items: arrTeams});
        },
        addPlayer({commit, state}, params) {
            let arrTeams = state.teams;
            let newPlayer = {
                name: params.name,
                position: params.position,
                age: params.age,
            }
            arrTeams.find((team, index) => {
                if (team.id === params.teamId) {
                    newPlayer.id = team.roster.reduce((prev, current) => prev.id > current.id ? prev : current, {}).id + 1;
                    arrTeams[index].roster.push(newPlayer);
                }
            });
            commit('set', {type: 'teams', items: arrTeams});
        }
    },
})
