import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import { usePetStore } from "@s/pets.store";
import { useClientStore } from "@s/clients.store";
import { useSpeciesStore } from "@s/species.store";
import { useRaceStore } from "@s/races.store";

import { MainLayout } from "@/layouts/MainLayout";

export default function PetPage() {
  const { id } = useParams();

  // Desestructuramos lo que necesitamos de cada store
  const {
    pets,
    getAll: getAllPets,
    request: petsRequest,
  } = usePetStore();

  const {
    clients,
    getAll: getAllClients,
    request: clientsRequest,
  } = useClientStore();

  const {
    species: allSpecies,
    getAll: getAllSpecies,
    request: speciesRequest,
  } = useSpeciesStore();

  const {
    races,
    getAll: getAllRaces,
    request: racesRequest,
  } = useRaceStore();

  // Usamos useMemo para derivar la mascota y relacionar datos del store
  const pet = useMemo(
    () => pets.find((x) => x.id === parseInt(id)),
    [pets, id]
  );

  const client = useMemo(
    () => (pet ? clients.find((x) => x.id === pet.client_id) : null),
    [clients, pet]
  );

  const species = useMemo(
    () => (pet ? allSpecies.find((x) => x.id === pet.species_id) : null),
    [allSpecies, pet]
  );

  const race = useMemo(
    () => (pet ? races.find((x) => x.id === pet.race_id) : null),
    [races, pet]
  );

  const title = pet?.name || "Cargando...";

  // Unificamos en un solo useEffect los fetches usando el estado de la request.
  useEffect(() => {
    if (petsRequest.idle) {
      getAllPets();
    }
    if (clientsRequest.idle) {
      getAllClients();
    }
    if (speciesRequest.idle) {
      getAllSpecies();
    }
    if (racesRequest.idle) {
      getAllRaces();
    }
  }, [
    petsRequest.idle,
    clientsRequest.idle,
    speciesRequest.idle,
    racesRequest.idle,
    getAllPets,
    getAllClients,
    getAllSpecies,
    getAllRaces,
  ]);

  // Consolidamos el estado de fetching para saber cuándo mostrar "Cargando..."
  const isFetching =
    petsRequest.fetching ||
    clientsRequest.fetching ||
    speciesRequest.fetching ||
    racesRequest.fetching;

  // Si aún se están obteniendo datos o no encontramos la mascota o su cliente, mostramos "Cargando..."
  if (isFetching || !pet || !client) {
    return (
      <MainLayout title={title}>
        <p>Cargando...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={pet.name}>
      <section className="h-[100%] space-y-2 border border-violet-800 p-4">
        <p>
          <strong>Nombre:</strong>&nbsp;{pet.name}
        </p>
        <p>
          <strong>Tutor:</strong>&nbsp;{client.name}
        </p>
        <p>
          <strong>Especie:</strong>&nbsp;{species?.name || "Dato no ingresado"}
        </p>
        <p>
          <strong>Raza:</strong>&nbsp;{race?.name || "Dato no ingresado"}
        </p>
        <p>
          <strong>Sexo:</strong>&nbsp;
          {pet.genre === "FEMALE" ? "Hembra" : "Macho"}
        </p>
        <p>
          <strong>Peso:</strong>&nbsp;
          {pet.weight === null ? "Dato no ingresado" : pet.weight}
        </p>
        <p>
          <strong>Edad:</strong>&nbsp;
          {pet.birthday === null ? "Dato no ingresado" : pet.birthday}
        </p>
        <p>
          <strong>Tipo de sangre:</strong>&nbsp;
          {pet.blood_type === null ? "Dato no ingresado" : pet.blood_type}
        </p>
        <p>
          <strong>Alergias:</strong>&nbsp;
          {pet.allergies === null ? "Dato no ingresado" : pet.allergies}
        </p>
        <p>
          <Link to={`/pets/${pet.id}/histories/`}>
            <strong>📖 Ir a historia clínica</strong>
          </Link>
        </p>
      </section>
    </MainLayout>
  );
}
