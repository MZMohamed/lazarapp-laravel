import CollectionContainer from "../collectionContainer";
import vehicleTypes from "../../../../utils/vehicleTypes.json"

const ComponentType = "equipment"

const Equipment = () => {

  return (
    <CollectionContainer
      collection={vehicleTypes} itemType={ComponentType}/>
  )

}

export default Equipment;
