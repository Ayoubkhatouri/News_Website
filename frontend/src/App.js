import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from 'react-bootstrap'
import{BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import SingleNewsScreen from "./screens/SingleNewsScreen";
import NewsByCategoryScreen from "./screens/NewsByCategoryScreen";
import NewsVideoScreen from "./screens/NewsVideoScreen";
import SingleVideoNewsScreen from "./screens/SingleVideoNewsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AddNewsScreen from "./screens/AddNewsScreen";
import NewsPubliesListScreen from "./screens/NewsPubliesListScreen";
import NewsAttenteListScreen from "./screens/NewsAttenteListScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UpdateNewsScreen from "./screens/UpdateNewsScreen";
import UsersListScreen from "./screens/UsersListScreen";
import UserEditbyAdminScreen from "./screens/UserEditbyAdminScreen";


function App() {
  return (
   <>
   <Router>
   <Header/>
   <main className="py-3">
    <Container>
   <Routes>
    <Route path="/" element={<HomeScreen/>}/>
    <Route path="/:category" element={<NewsByCategoryScreen/>}/>
    <Route path="/news/:id" element={<SingleNewsScreen/>}/>
    <Route path="/videos" element={<NewsVideoScreen/>}/>
    <Route path="/videos/:id" element={<SingleVideoNewsScreen/>}/>
    <Route path="/users/abonnez" element={<LoginScreen/>}/>
    <Route path="/users/register" element={<RegisterScreen/>}/>
    <Route path="/ajouterNews" element={<AddNewsScreen/>}/> 
    <Route path="/admin/publies/newsList" element={<NewsPubliesListScreen/>} />
    <Route path="/admin/enattente/newsList" element={<NewsAttenteListScreen/>}/>
    <Route path="/users/profile" element={<ProfileScreen/>}/>
    <Route path="/admin/news/modifier/:id" element={<UpdateNewsScreen/>}/>
    <Route path="/admin/userList" element={<UsersListScreen/>}/>
    <Route path="/admin/users/modifier/:id" element={<UserEditbyAdminScreen/>}/>
    <Route path="/rechercher/:keyword" element={<HomeScreen/>} exact />
    <Route path="/:category/rechercher/:keyword" element={<NewsByCategoryScreen/>}/>
    <Route path="/videos/rechercher/:keyword" element={<NewsVideoScreen/>}/>
   </Routes>
   </Container>
   </main>
   <Footer/>
   </Router>
   </>
  );
}

export default App;
