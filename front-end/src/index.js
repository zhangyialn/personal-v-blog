import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom'
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Router>
        <App/>
    </Router>
)