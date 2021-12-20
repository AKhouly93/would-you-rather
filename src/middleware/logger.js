const logger = storeAPI => next => action => {
    console.log ('Dispatching action ', action);
    let result = next(action);
    console.log ('State: ', storeAPI.getState());
    return result;
}
export default logger;