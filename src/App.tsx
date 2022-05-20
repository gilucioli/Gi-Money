import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from './components/NewTransactionModal/indes';
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from './TransactionsContext';

Modal.setAppElement('#root');//para acessibilidade

export function App() {
const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

function handleOpenNewTransactionModal(){
  setIsNewTransactionModalOpen(true);
}

function handleCloseNewTransactionmodal(){
  setIsNewTransactionModalOpen(false);
}

  return (
    <TransactionsProvider>
     <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>

     <Dashboard/>
     
     <NewTransactionModal 
        isOpen={isNewTransactionModalOpen} 
        onRequestClose={handleCloseNewTransactionmodal}
      />
      
     <GlobalStyle/>
    </TransactionsProvider>
  );
}