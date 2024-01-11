import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
// import { X } from 'phosphor-react';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface ICreateFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<IFoodPlate, 'id' | 'available'>) => void;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddFood,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateFoodData) => {
      handleAddFood(data);

      setIsOpen();
    },
    [handleAddFood, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {/* <CloseButton setIsOpen={setIsOpen}>
        <X size={24}/>
      </CloseButton> */}

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>

        <label className="label">URL de imagem</label>
        <Input name="image" placeholder="Cole o link aqui" />

        <div>
          <div>
            <label className="label">Nome do Prato</label>
            <Input 
              name="name" 
              placeholder="Ex: Moda Italiana" 
              // required
    
            />
          </div>
            
          <div>
            <label className="label">Preço</label>
            <Input
              name="price" 
              placeholder="Ex: 19.90" 
              // required  
            />
          </div>
        </div>

        <label className="label">Descrição do prato</label>
        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
      
    </Modal>
  );
};

export default ModalAddFood;
