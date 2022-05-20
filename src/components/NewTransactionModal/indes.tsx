import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { TransactionsContext } from '../../TransactionsContext';
import { api } from '../../services/api';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { Container, RadioBox, TransactionTypeContainer } from './styles';


interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
};

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
    const { createTransaction }= useContext(TransactionsContext)

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

   async function handleCreateNewTransaction(event : FormEvent){
        event.preventDefault();
       
        await createTransaction({
            title,
            amount,
            category,
            type
        })

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName="react-modal-overlay" className="react-modal-content">
         <button type="button" className='react-modal-close'>
             <img src={closeImg} alt="Fechar modal" />
         </button>
          <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transacao</h2>
            <input 
                placeholder='Titulo'
                value={title}
                onChange={event => setTitle(event.target.value)}                
            />
            <input 
                type="number" 
                placeholder='Valor'
                value={amount}
                onChange={event => setAmount(Number(event.target.value))}
                // onChange={event => setValue(+event.target.value)}
            />
            <TransactionTypeContainer>
            <RadioBox type="button" isActive = {type=== 'deposit'} activeColor="green" onClick={()=> setType('deposit')}>
                <img src={incomeImg} alt="Entrada"/>
                <span>Entrada</span>
            </RadioBox>
            <RadioBox type="button" isActive = {type=== 'withdraw'} activeColor="red" onClick={()=> setType('withdraw')}>
                <img src={outcomeImg} alt="Saida"/>
                <span>Saida</span>
            </RadioBox>
            </TransactionTypeContainer>

            <input 
                placeholder='Categoria'
                value={category}
                onChange={event => setCategory(event.target.value)}     
            />
            <button type="submit">Cadastrar</button>
          </Container>    
      </Modal>
    )
}