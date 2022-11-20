/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, ChangeEvent, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button";
import EmptyState from "../../components/emptyState";
import Loading from "../../components/loading";
import Modal from "../../components/modal";
import TextField from "../../components/textField";
import useDispatch from "../../utils/hooks/useDispatch";
import useSelector from "../../utils/hooks/useSelector";
import { getBeerById, edit, remove } from "../../store/beers";
import { Beer } from "../../types";
import isDefined from "../../utils/functions/isDefined";

// TODO: tentar instalar prettier
// TODO: testes

interface EditModal {
  isOpen: boolean;
  name: string;
  firstBrewed: string;
  abv: number;
}

const initialValues = {
  editModal: {
    isOpen: false,
    name: "",
    firstBrewed: "",
    abv: 0,
  },
  isOpenRemoveModal: false,
};

const Detail = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const list = useSelector(state => state.beers.list);
  const addedBeers = useSelector(state => state.beers.addedBeers);
  const errorLoadingBeer = useSelector(state => state.beers.errorLoadingBeer);

  const hasClickedEditBeer = useRef<boolean>(false);
  const hasClickedRemoveBeer = useRef<boolean>(false);
  const idExistsInAddedBeerList = useRef<boolean>(false);
  const idExistsInBeerList = useRef<boolean>(false);
  const [beer, setBeer] = useState<Beer | undefined>(undefined);
  const [editModal, setEditModal] = useState<EditModal>(initialValues.editModal);
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState<boolean>(
    initialValues.isOpenRemoveModal,
  );

  useEffect(() => {
    idExistsInAddedBeerList.current = addedBeers.some((beer: Beer) => beer.id === id);
    idExistsInBeerList.current = list.some((beer: Beer) => beer.id === id);

    if (idExistsInAddedBeerList.current) setBeer(addedBeers.find((beer: Beer) => beer.id === id));
    else if (idExistsInBeerList.current) setBeer(list.find((beer: Beer) => beer.id === id));
    else dispatch(getBeerById(Number(id)));
  }, [id]);

  useEffect(() => {
    if (hasClickedRemoveBeer.current) {
      handleClickGoBack();
      handleClickRemoveModalClose();
      hasClickedRemoveBeer.current = false;
    } else {
      if (hasClickedEditBeer.current) {
        handleClickEditModalClose();
        hasClickedEditBeer.current = false;
      }

      if (idExistsInAddedBeerList.current) setBeer(addedBeers.find((beer: Beer) => beer.id === id));
      else setBeer(list.find((beer: Beer) => beer.id === id));
    }
  }, [list, addedBeers]);

  // #region Go Back functions
  const handleClickGoBack = (): void => {
    navigate(-1);
  };
  // #endregion

  // #region Remove functions
  const handleClickRemove = (): void => {
    setIsOpenRemoveModal(true);
  };

  const handleClickRemoveModalConfirm = (): void => {
    dispatch(remove(String(id)));
    hasClickedRemoveBeer.current = true;
  };

  const handleClickRemoveModalClose = (): void => {
    setIsOpenRemoveModal(initialValues.isOpenRemoveModal);
  };
  // #endregion

  // #region Edit functions
  const handleClickEditBeer = (): void => {
    setEditModal({
      isOpen: true,
      name: String(beer?.name),
      firstBrewed: String(beer?.firstBrewed),
      abv: Number(beer?.abv),
    });
  };

  const handleChangeEditModal = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void => {
    setEditModal({ ...editModal, [name]: value });
  };

  const handleClickEditModalConfirm = (): void => {
    const { name, firstBrewed, abv } = editModal;
    dispatch(edit({ id: String(id), name, firstBrewed, abv }));
    hasClickedEditBeer.current = true;
  };

  const handleClickEditModalClose = (): void => {
    setEditModal(initialValues.editModal);
  };
  // #endregion

  const isLoading: boolean = !isDefined(beer) && !errorLoadingBeer;
  const showImage: boolean = !beer?.id.startsWith("n-");
  const isConfirmEditDisabled: boolean = editModal.name === "" || editModal.firstBrewed === "";

  return (
    <>
      <div className="detail" data-testid="detail">
        <div className="detail__actions">
          {!isLoading && <Button onClick={handleClickGoBack} label="Go Back" color="secondary" />}
          {isDefined(beer) && (
            <>
              <Button
                onClick={handleClickRemove}
                label="Remove"
                color="danger"
                disabled={hasClickedRemoveBeer.current}
              />
              <Button onClick={handleClickEditBeer} label="Edit" />
            </>
          )}
        </div>
        {isLoading && <Loading />}
        {!isDefined(beer) && errorLoadingBeer && (
          <EmptyState
            title="Something went wrong!"
            subtitle="The beer requested could not be loaded."
          />
        )}
        {isDefined(beer) && (
          <div className="detail__card">
            {showImage && (
              <div className="detail__card--left">
                <img key={id} src={beer?.imageUrl} alt={beer?.name} />
              </div>
            )}
            <div className="detail__card--right">
              <h1 className="title">{beer?.name}</h1>
              <div className="section">
                <h4>Description</h4>
                <p>{beer?.description}</p>
              </div>
              <div className="section">
                <h4>Tips</h4>
                <p>{beer?.brewersTips}</p>
              </div>
              <div className="section">
                <h4>Best served with</h4>
                <p>{beer?.foodPairing.join("; ")}.</p>
              </div>
              <div className="section">
                <h4>First brewed</h4>
                <p>{beer?.firstBrewed}</p>
              </div>
              <div className="section">
                <h4>Abv</h4>
                <p>{beer?.abv}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {isOpenRemoveModal && (
        <Modal
          title="Remove beer"
          body={<p>Are you sure that you want to remove this beer from the catalogue?</p>}
          footer={
            <>
              <Button onClick={handleClickRemoveModalClose} label="Cancel" color="secondary" />
              <Button onClick={handleClickRemoveModalConfirm} label="Remove" color="danger" />
            </>
          }
        />
      )}
      {editModal.isOpen && (
        <Modal
          title="Edit beer"
          body={
            <>
              <TextField
                onChange={handleChangeEditModal}
                value={editModal.name}
                placeholder="Name"
                label="Name"
                name="name"
              />
              <TextField
                onChange={handleChangeEditModal}
                value={editModal.firstBrewed}
                placeholder="MM/YYYY"
                label="First brewed"
                name="firstBrewed"
              />
              <TextField
                onChange={handleChangeEditModal}
                value={String(editModal.abv)}
                label="ABV"
                type="number"
                name="abv"
                max={100}
                min={0}
              />
              <i>*For challenge purposes, not all fields are editable</i>
            </>
          }
          footer={
            <>
              <Button onClick={handleClickEditModalClose} label="Cancel" color="secondary" />
              <Button
                onClick={handleClickEditModalConfirm}
                label="Edit"
                disabled={isConfirmEditDisabled}
              />
            </>
          }
        />
      )}
    </>
  );
};

export default memo(Detail);
