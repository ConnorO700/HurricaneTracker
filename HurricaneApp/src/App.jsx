
import MainPage from './pages/MainPage'
import HurricaneView from './pages/HurricaneView'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

const Router = createBrowserRouter(createRoutesFromElements(
	<Route >
		<Route index element={<MainPage />} />
		<Route path='/:stormId'element={<HurricaneView />} />
	</Route>
))

function App() {

	return (
		<>
			<RouterProvider router={Router} />
		</>
	)
}

export default App
