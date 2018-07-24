export const nextTick = () => new Promise((res) => process.nextTick(res));
