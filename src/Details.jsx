import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const results = useQuery(["details", id], fetchPet);
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  if (results.isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <h2 className="animate-spin text-8xl">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="my-0 mx-auto mb-6 p-4 w-11/12 bg-gray-200 rounded-md shadow-md">
      <Carousel images={pet.images} />
      <div>
        <h1 className="text-center text-gray-600 text-6xl my-1 mx-0">
          {pet.name}
        </h1>
        <h2 className="text-center mt-1 mb-5 my-0">{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button
          onClick={() => setShowModal(true)}
          className="rounded mx-auto px-6 py-2 color text-white hover:opacity-50 border-none bg-orange-500"
        >
          Adopt {pet.name}
        </button>
        <p className="px-15 py-0">{pet.description}</p>
        {showModal ? (
          <Modal>
            <div className="max-w-lg p-4 text-center bg-gray-200 rounded-3xl">
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                  className="inline-block rounded mr-4 px-6 py-2 color text-white hover:opacity-50 border-none bg-orange-500"
                >
                  Yes
                </button>
                <button
                  className="inline-block rounded mr-4 px-6 py-2 color text-white hover:opacity-50 border-none bg-orange-500"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
