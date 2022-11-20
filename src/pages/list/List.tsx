/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, ChangeEvent, memo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Card from "../../components/card";
import EmptyState from "../../components/emptyState";
import Loading from "../../components/loading";
import Modal from "../../components/modal";
import TextField from "../../components/textField";
import useDispatch from "../../utils/hooks/useDispatch";
import useSelector from "../../utils/hooks/useSelector";
import { getBeersList, add, reset } from "../../store/beers";
import { Beer } from "../../types";

interface AddModal {
  isOpen: boolean;
  name: string;
  firstBrewed: string;
  abv: number;
}

const initialValues = {
  isLoading: true,
  addModal: {
    isOpen: false,
    name: "",
    firstBrewed: "",
    abv: 0,
  },
};

const List = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const list = useSelector(state => state.beers.list);
  const addedBeers = useSelector(state => state.beers.addedBeers);
  const currentPage = useSelector(state => state.beers.currentPage);
  const errorLoadingBeer = useSelector(state => state.beers.errorLoadingBeer);

  const hasClickedAddBeer = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(initialValues.isLoading);
  const [addModal, setAddModal] = useState<AddModal>(initialValues.addModal);

  useEffect(() => {
    dispatch(getBeersList());
    if (errorLoadingBeer) dispatch(reset("errorLoadingBeer"));
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [list]);

  useEffect(() => {
    if (hasClickedAddBeer.current) {
      handleClickAddModalClose();
      hasClickedAddBeer.current = false;
    }
  }, [addedBeers]);

  // #region Add functions
  const handleClickAddBeer = (): void => {
    setAddModal({ ...initialValues.addModal, isOpen: true });
  };

  const handleChangeAddModal = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>): void => {
    setAddModal({ ...addModal, [name]: value });
  };

  const handleClickAddModalConfirm = (): void => {
    const { name, firstBrewed, abv } = addModal;
    hasClickedAddBeer.current = true;
    dispatch(add({ name, firstBrewed, abv }));
  };

  const handleClickAddModalClose = (): void => {
    setAddModal(initialValues.addModal);
  };
  // #endregion

  // #region Load more functions
  const handleClickLoad = (): void => {
    dispatch(getBeersList(currentPage + 1));
    setIsLoading(true);
  };
  // #endregion

  // #region Go to detail functions
  const handleClickBeerDetail = (id: string): void => {
    navigate(`/beers/${id}`);
  };
  // #endregion

  const isConfirmCreateDisabled: boolean = addModal.name === "" || addModal.firstBrewed === "";

  return (
    <>
      <div className="list">
        <div className="list__actions">
          {!isLoading && <Button onClick={handleClickAddBeer} label="Create beer" />}
        </div>
        {addedBeers.length > 0 && (
          <>
            <h3>Created beers</h3>
            <div className="list__grid added-list">
              {addedBeers.map((beer: Beer) => (
                <Card
                  key={beer.id}
                  id={beer.id}
                  imageUrl={beer.imageUrl}
                  name={beer.name}
                  onClick={handleClickBeerDetail}
                  firstBrewed={beer.firstBrewed}
                  abv={beer.abv}
                />
              ))}
            </div>
          </>
        )}
        <div className="list__grid">
          {list.map((beer: Beer) => (
            <Card
              key={beer.id}
              id={beer.id}
              imageUrl={beer.imageUrl}
              name={beer.name}
              onClick={handleClickBeerDetail}
              firstBrewed={beer.firstBrewed}
              abv={beer.abv}
            />
          ))}
        </div>
        {!isLoading && list.length === 0 && addedBeers.length === 0 && (
          <EmptyState
            title="No beers found in the catalogue!"
            subtitle="Load more beers or create a new one."
          />
        )}
        <div className="list__load">
          {!isLoading && <Button onClick={handleClickLoad} label="Load more" color="secondary" />}
        </div>
      </div>
      {isLoading && <Loading />}
      {addModal.isOpen && (
        <Modal
          title="Create beer"
          body={
            <>
              <TextField
                onChange={handleChangeAddModal}
                value={addModal.name}
                placeholder="Name"
                label="Name"
                name="name"
              />
              <TextField
                onChange={handleChangeAddModal}
                value={addModal.firstBrewed}
                placeholder="MM/YYYY"
                label="First brewed"
                name="firstBrewed"
              />
              <TextField
                onChange={handleChangeAddModal}
                value={String(addModal.abv)}
                label="ABV"
                type="number"
                name="abv"
                max={100}
                min={0}
              />
              <i>*For challenge purposes, not all fields are customizable</i>
            </>
          }
          footer={
            <>
              <Button onClick={handleClickAddModalClose} label="Cancel" color="secondary" />
              <Button
                onClick={handleClickAddModalConfirm}
                label="Create"
                disabled={isConfirmCreateDisabled}
              />
            </>
          }
        />
      )}
    </>
  );
};

export default memo(List);
