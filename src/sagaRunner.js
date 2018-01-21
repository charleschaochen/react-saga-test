/**
 * 运行所有sagas
 * 新的saga在这里注册
 */
import homeSaga from './Home/sagas.js'

const runAllSagas = (sagaMiddleware) => {
    sagaMiddleware.run(homeSaga);
};

export default runAllSagas