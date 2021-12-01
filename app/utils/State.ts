const states = ['doing', 'finished'] as const

type State = typeof states[number]

export { states, State }
