import React from "react"


export function PetHistoryModal({name, tutor, weight, diagnosis, observations}) {

    return(
    <>
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blursm flex justify-center items-center" >
        <div className="bg-yellow-400 h-[60%] w-[55%] p-5 rounded flex-col justify-center items-center gap-5">
        <p>
			<strong>Nombre:</strong>&nbsp;
				{name}
			</p>
			<p>
				<strong>Tutor:</strong>&nbsp;
				{tutor}
			</p>
            <p>
				<strong>Ultimo pesaje:</strong>&nbsp;
				{weight}
			</p>
            <p>
				<strong>Diagnostico:</strong>&nbsp;
				{diagnosis}
			</p>
            <p>
				<strong>Observaciones:</strong>&nbsp;
                {observations}
			</p>
        </div>
    </div>
    </>
    )
}