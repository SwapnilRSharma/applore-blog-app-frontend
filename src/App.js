import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import BlogListing from './components/blogListing';
import BlogDetail from './components/blogDetail';
import LoginPage from './components/loginPage';
import Dashboard from './components/dashboard';
import UserDashboard from './components/userDashboard';
import ViewBlog from './components/viewBlog';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<BlogListing/>} />
          <Route path="/blog/:blogId" element={<BlogDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/view/:blogId" element={<ViewBlog />} />
          <Route>404 Not Found!</Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
