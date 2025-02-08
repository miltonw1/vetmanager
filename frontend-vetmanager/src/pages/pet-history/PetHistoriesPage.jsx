import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { usePetStore } from "@s/pets.store";
import { useClientStore } from "@s/clients.store";
import { useHistoriesStore } from "@s/histories.store";

import { MainLayout } from "@/layouts/MainLayout";
import { PetHistoryModal } from "../../components/histories/PetHistoryModal";
import { PetHistoryItem } from "../../components/histories/PetHistoryItem";
import { CreateHistoryModal } from "../../components/histories/CreateHistoryModal";

export default function PetHistoriesPage() {
  const { id } = useParams();
  const [modalInfo, setModalInfo] = useState(null);
  const [creationModalShow, setCreationModalShow] = useState(false);

  // Funciones de modal (en una sola línea para simplificar)
  const openModal = (info) => setModalInfo(info);
  const closeModal = () => setModalInfo(null);
  const openCreationModal = () => setCreationModalShow(true);
  const closeCreationModal = () => setCreationModalShow(false);

  // Accedemos a los stores y sus métodos
  const { pets, getAll: getAllPets, request: petsRequest } = usePetStore();
  const { clients, getAll: getAllClients, request: clientsRequest } = useClientStore();
  const { histories, getAll: getAllHistories, request: historiesRequest } = useHistoriesStore();

  const history = useMemo(
    () => {
      if (!modalInfo || !histories){
        return null;
      }

      return histories.find((x) => x.id === parseInt(modalInfo.historyId)) || null
    }
    , [histories, modalInfo]
  )

  // Derivamos la mascota y su cliente
  const pet = useMemo(
    () => pets.find((p) => p.id === parseInt(id)),
    [pets, id]
  );
  const client = useMemo(
    () => (pet ? clients.find((c) => c.id === pet.client_id) : null),
    [clients, pet]
  );
  const title = useMemo(
    () => (pet?.name ? `Historia clínica de ${pet.name}` : "Historia clínica"),
    [pet]
  );

  // Disparamos los fetchs únicamente basándonos en el estado de la request (sin condicionar por el largo de los arrays)
  useEffect(() => {
    if (petsRequest.idle) {
      getAllPets();
    }
    if (clientsRequest.idle) {
      getAllClients();
    }
    if (historiesRequest.idle) {
      getAllHistories(id);
    }
  }, [
    petsRequest.idle,
    clientsRequest.idle,
    historiesRequest.idle,
    getAllPets,
    getAllClients,
    getAllHistories,
    id,
  ]);

  const isFetching =
    petsRequest.fetching || clientsRequest.fetching || historiesRequest.fetching;

  // Mientras se obtiene la información o no se encuentre la mascota, mostramos "Cargando..."
  if (isFetching || !pet) {
    return (
      <MainLayout title={title}>
        <p>Cargando...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={title}>
      <button
        className="bg-cyan-800 text-white p-2 rounded hover:bg-red-800"
        onClick={openCreationModal}
      >
        Nueva historia
      </button>

      {histories.length === 0 ? (
        <h1>{pet.name} no posee ninguna historia creada</h1>
      ) : (
        <ul className="list-disc list-inside gap-4">
          {histories.map((history, index) => (
            <PetHistoryItem
              key={history.id}
              expanded={index === 0}
              history={history}
              petName={pet.name}
              tutor={client?.name}
              openModal={openModal}
            />
          ))}
        </ul>
      )}

      {modalInfo && (
        <PetHistoryModal
          history={history}
          name={modalInfo.name}
          tutor={modalInfo.tutor}
          weight={modalInfo.weight}
          diagnosis={modalInfo.diagnosis}
          observations={modalInfo.observations}
          images={modalInfo.images || []}
          onClose={closeModal}
        />
      )}

      {creationModalShow && (
        <CreateHistoryModal pet={pet} onClose={closeCreationModal} />
      )}
    </MainLayout>
  );
}
