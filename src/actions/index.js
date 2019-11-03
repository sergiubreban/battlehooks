export const PlayTurnAction = (target) => ({ type: PlayTurnActionType, payload: target })
export const StartGameAction = (message) => ({ type: StartGameActionType, payload: message })
export const RestartGameAction = (gameInfo) => ({ type: RestartGameActionType, payload: gameInfo })
export const SetMessageAction = (message) => ({ type: SetMessageActionType, payload: message })

export const PlayTurnActionType = 'PLAY_TURN'
export const StartGameActionType = 'START'
export const RestartGameActionType = 'RESTART'
export const SetMessageActionType = 'MESSAGE'

