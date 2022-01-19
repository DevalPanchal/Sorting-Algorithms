import { SortingVisualizer } from "./Components/SortingVisualizer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./stylesheets/styles.css";

function App() {
  	return (
  	  	<div className="App">
		    <Router>
		    		<Routes>
				    <Route exact path="/" element={ <SortingVisualizer /> } />
				</Routes>
		    </Router>
  	  	</div>
  	);
}

export default App;
