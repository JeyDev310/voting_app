import { Header } from 'components';
import { Home, VotingPoll } from 'pages';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/:voteId' element={<VotingPoll />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
