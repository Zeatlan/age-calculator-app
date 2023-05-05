type time = 'day' | 'month' | 'year'

export default interface IInputValue {
    key: time,
    text: string,
}