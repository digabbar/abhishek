import React, { Fragment, useEffect } from "react";
import Row from "react-bootstrap/Row";
import DisplayProduct from "./DisplayProduct";
import ReviewContainer from "./ReviewContainer";
import { getProductDetails } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../UI/Loader";
import { useAlert } from "react-alert";
import { clearError } from "../../actions/productActions";
import { newReviewAction } from "../../slice/newReviewSlice";
import { deleteReviewAction } from "../../slice/deleteReviewSlice";
const ProductDetail = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = useSelector((state) => state.deleteReview);

  const {
    loading: reviewLoading,
    success,
    error: reviewError,
  } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getProductDetails(params.id));

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError("deleteReview"));
    }
    if (deleteSuccess) {
      alert.success("Review deleted successfully");
      dispatch(deleteReviewAction.delete_review_reset());
    }
    if (error) {
      alert.error(error);
      dispatch(clearError("productDetail"));
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError("createReview"));
    }

    if (success) {
      alert.success("Review posted successfully");
      dispatch(newReviewAction.new_review_reset());
    }
  }, [
    dispatch,
    params.id,
    alert,
    error,
    reviewError,
    success,
    deleteError,
    deleteSuccess,
  ]);

  if (loading || reviewLoading || deleteLoading) {
    return <Loader />;
  }
  return (
    <Fragment>
      <Row xs={1} md={2} className="g-4">
        <DisplayProduct product={product} />
        <ReviewContainer product={product} />
      </Row>
    </Fragment>
  );
};

export default ProductDetail;
