import "./collection-bar.css";
import { CollectionBlock, Spinner } from "../core";
import { CollectionNS } from '../../types';
import AddNewCollectionBlock from '../add-new-collection-block/add-new-collection-block.component';
interface IProps {
    disableAddBlock: boolean;
    selectedCollection: CollectionNS.ICollection | null;

    loading: boolean;
    collectionList: CollectionNS.ICollection[];
    handleSelectedCollection: (collection: CollectionNS.ICollection | null) => void;

    // For add collection block
    handleInputValidation?: (value: string) => void;
    showAddForm?: boolean;
    setShowAddForm?: React.Dispatch<React.SetStateAction<boolean>>;
    newCollectionFields?: {
        emoji: string;
        name: string;
    };
    setNewCollectionFields?: React.Dispatch<React.SetStateAction<{
        emoji: string;
        name: string;
    }>>;
    handleSubmitNewCollection?: () => Promise<void>;
    handleDeleteCollection?: (collection: CollectionNS.ICollection) => void;
}
const CollectionBar = (props: IProps) => {
    return (
        <div className="collectionBarContainer">
            <div className="allBlock" title='All collection'>
                <button
                    className={`${props.selectedCollection === null ? "focus" : "collectionBlockContainer"}`}
                    style={{ height: "100px", width: "100px" }}
                    name="add"
                    onClick={(e) => props.handleSelectedCollection(null)}
                >
                    <div className="iconWrapper">📋</div>
                    <div className="collectionText">All</div>
                </button>
            </div>
            <div className="collectionBar">
                {
                    props.loading
                        ? <span className='loading'><Spinner /></span>
                        : props.collectionList.map((collection: CollectionNS.ICollection, index: number) => {
                            return (
                                <CollectionBlock
                                    Title={collection.name + ' collection'}
                                    handleDeleteCollection={props.handleDeleteCollection}
                                    selectedCollectionId=
                                    {
                                        props.selectedCollection !== null &&
                                            props.selectedCollection._id ?
                                            props.selectedCollection._id : null
                                    }
                                    collection={collection}
                                    key={collection._id}
                                    OnClick={() => props.handleSelectedCollection(collection)}
                                    index={index}
                                />
                            );
                        })
                }
            </div>


            {!props.disableAddBlock && <>
                <div className="addNewBlock">
                    <button
                        title='Add new collection'
                        className="collectionBlockContainer"
                        disabled={props.disableAddBlock}
                        style={{ height: "100px", width: "100px" }}
                        name="add"
                        onClick={() => props.setShowAddForm && props.setShowAddForm(true)}
                    >
                        <div className="iconWrapper">➕</div>
                        <div className="collectionText">Add</div>
                    </button>
                </div>
                <AddNewCollectionBlock
                    handleSubmitNewCollection={props.handleSubmitNewCollection}
                    newCollectionFields={props.newCollectionFields}
                    showAddForm={props.showAddForm}
                    handleInputValidation={props.handleInputValidation}
                    setNewCollectionFields={props.setNewCollectionFields}
                    setShowAddForm={props.setShowAddForm}
                />
            </>
            }


        </div>
    );
};

export default CollectionBar;
