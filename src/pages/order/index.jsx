import LayoutOrder from "../../components/layout/LayoutOrder";
import Image from "next/image";
import cineOne21 from "../../assets/images/cinemas/cineOne21.png";
import hiflix from '../../assets/images/cinemas/hiflix.png'
import ibv from '../../assets/images/cinemas/ebv.id.png'
import styles from "../../styles/Order.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../components/Footer"
import Seat from 'components/seat/Seat'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Order() {
  const [seatPick, setSeatPick] = useState([]);
  const router = useRouter()

  const {query : {
    title,
    price,
    movie_id,
    cinema_id,
    cinema_name,
    time,
    date
}} = useRouter()

  return (
    <>
      <LayoutOrder title="Order Page">
          <Container className="py-5">
            <Row>
              <Col xs={12} md={8}>
                <div className={`mb-5`}>
                  <h5>Movie Selected</h5>
                  <div
                    className={`${styles.selectedMovies} d-flex flex-wrap justify-content-between my-4 align-items-center`}
                  >
                    <h5>{title}</h5>
                    <div className={`${styles.btnChange} btn btn-secondary`}>
                      Change movie
                    </div>
                  </div>
                </div>

                <div className={`styles.seatCinemas`}>
                  <h5 className={styles.chooseTitle}>Choose Your Seat</h5>
                  <Row
                    className={`${styles.selectedSeat} d-flex justify-content-center`}
                  >
                    <Row className={`${styles.screen} justify-content-center`}>
                      <p className="text-center">Screen</p>
                      <hr className={styles.sreenCinema} />
                    <Seat setSeatPick={setSeatPick} seatPick={seatPick}/>
                    </Row>
                    <div className="my-5">
                      <Row>
                        <Col>
                          <h6>Seating key</h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} className={`d-flex flex-row flex-wrap justify-content-evenly ${styles.setSeat}`}>
                          <div className="d-flex flex-row align-items-center m-1">
                          <span className={styles.seatAvailable} />Available
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <span className={styles.seatSelected} />Selected
                          </div>
                          <div className="d-flex flex-row align-items-center">
                          <span className={styles.seatLove} />Love nest
                          </div>
                          <div className="d-flex flex-row align-items-center">
                          <span className={styles.seatSold} />Sold
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Row>
                </div>

                <div className="d-flex justify-content-between flex-wrap my-4">
                  <div className={styles.btnChangeMovies}>Change your movie</div>
                  <div className={styles.btnCheckout} onClick={()=>{
                    router.push({pathname : '/payment', query : {
                      title,
                      price,
                      movie_id,
                      cinema_id,
                      cinema_name,
                      time,
                      date,
                      total_ticket : seatPick.length,
                      seats : seatPick
                    }})
                  }}>Checkout Now</div>
                </div>
              </Col>

              <Col xs={12} md={4}>
                <h5>Order Info</h5>
                <div className={`${styles.orderInfo} px-4`}>
                  <div className="text-center">
                  {cinema_name === 'hiflix' ? 
                  <Image src={hiflix} alt="" />
                  : ''}
                  {cinema_name === 'ebv.id' ? 
                  <Image src={ibv} alt="" />
                   : ''}
                  {cinema_name === 'CineOne21' ? 
                  <Image src={cineOne21} alt="" />
                  : ''}
                    <h5>{cinema_name}</h5>
                  </div>
                  <Row className="d-flex justify-content-between mt-4">
                    <p className="col-md-6">Movie selected</p>
                    <h6 className={`${styles.textInfo} col-md-6`}>{title}</h6>
                  </Row>
                  <Row className="d-flex justify-content-between">
                    <p className="col-md-6">{date}</p>
                    <h6 className={`${styles.textInfo} col-md-6`}>{time}</h6>
                  </Row>
                  <Row className="d-flex justify-content-between">
                    <p className="col-md-6">One ticket price</p>
                    <h6 className={`${styles.textInfo} col-md-6`}>{price}</h6>
                  </Row>
                  <Row className="r-flex justify-content-between">
                    <p className="col-md-6">Seat choosed</p>
                    <h6 className={`${styles.textInfo} col-md-6`}>{seatPick.map(seat=>`${seat}, `)}</h6>
                  </Row>
                  <hr />
                  <Row className="d-flex justify-content-between total align-items-center">
                    <h6 className="col-md-6">Total Payment</h6>
                    <p className={`${styles.textInfo} col-md-6`}><b>{price * seatPick.length}</b></p>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
      </LayoutOrder>
      <Footer />
    </>
  );
}
