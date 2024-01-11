/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";

import api from "../../services/api";

import { Header } from "../../components/Header";
import { Food } from "../../components/Food";

import { Container, FoodsContainer } from "./styles";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";

//Interface
interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

export function Dashboard(){

  //Estados
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState();
  const [editModalOpen, setEditModalOpen] = useState(false);


  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get('/foods');

      console.log(response.data)
      setFoods(response.data)
    } 

    loadFoods();
  }, []);

  //Funções
  async function handleAddFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true
      })

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const response = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food
      })

      setFoods(
        foods.map(mappedFood => 
          mappedFood.id === editingFood.id ? { ...response.data } : mappedFood,  
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDeleteFood(id: number): Promise<void> {
    try {
      await api.delete(`/foods/${id}`)

      setFoods(foods.filter(food => food.id !== id ))
    } catch (error) {
      console.log(error)
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    setEditingFood(food)
    toggleEditModal()
  }

  return(
    <Container>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => ( 
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
           ))} 
      </FoodsContainer>
     
    </Container>
  )
}