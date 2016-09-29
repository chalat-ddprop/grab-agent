export const updateCondition = (key, value) => {
    return {
        type: 'UPDATE_CONDITION',
        key: key,
        value: value,
    }
}
