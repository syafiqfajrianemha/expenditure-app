import "./App.css";
import React from "react";
import ModalCreate from "./component/ModalCreate";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sisaUang: 0,
      persentaseUang: 0,
      pemasukkanUang: 0,
      pengeluaranUang: 0,
      transaksiIN: 0,
      transaksiOUT: 0,
      summary: [
        // {
        //   deskripsi: "Menerima Gaji",
        //   tanggal: "11 Jully 2022",
        //   nominal: 1000000,
        //   kategori: "IN",
        // },
        // {
        //   deskripsi: "Menerima Gaji ke 2",
        //   tanggal: "11 Jully 2022",
        //   nominal: 2000000,
        //   kategori: "IN",
        // },
        // {
        //   deskripsi: "Nasi Goreng",
        //   tanggal: "12 Jully 2022",
        //   nominal: 20000,
        //   kategori: "OUT",
        // },
      ],
    };

    this.addItem = this.addItem.bind(this);
  }

  addItem(data) {
    const newData = [...this.state.summary, data];
    let dataUangIN = newData.filter((item) => item.kategori === "IN");
    let nominalUangIN = dataUangIN.map((item) => item.nominal);
    let jumlahUangIN = nominalUangIN.reduce((total, num) => total + num, 0);

    let dataUangOUT = newData.filter((item) => item.kategori === "OUT");
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num, 0);

    this.setState({
      pemasukkanUang: jumlahUangIN,
      transaksiIN: dataUangIN.length,
      pengeluaranUang: jumlahUangOUT,
      transaksiOUT: dataUangOUT.length,
      sisaUang: jumlahUangIN - jumlahUangOUT,
      persentaseUang: ((jumlahUangIN - jumlahUangOUT) / jumlahUangIN) * 100,
      summary: newData,
    });
  }

  componentDidMount() {
    if (this.state.summary.length != 0) {
      let dataUangIN = this.state.summary.filter(
        (item) => item.kategori === "IN"
      );
      let nominalUangIN = dataUangIN.map((item) => item.nominal);
      let jumlahUangIN = nominalUangIN.reduce((total, num) => total + num);

      let dataUangOUT = this.state.summary.filter(
        (item) => item.kategori === "OUT"
      );
      let nominalUangOUT = dataUangOUT.map((item) => item.nominal);
      let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num);

      this.setState({
        pemasukkanUang: jumlahUangIN,
        transaksiIN: dataUangIN.length,
        pengeluaranUang: jumlahUangOUT,
        transaksiOUT: dataUangOUT.length,
        sisaUang: jumlahUangIN - jumlahUangOUT,
        persentaseUang: ((jumlahUangIN - jumlahUangOUT) / jumlahUangIN) * 100,
      });
    }
  }

  render() {
    return (
      <>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1>EXPENDITURE APP</h1>
              <hr className="w-75 mx-auto" />
              <h3>Rp. {this.state.sisaUang},-</h3>
              <span className="title">
                Sisa uang kamu tersisa {this.state.persentaseUang}% lagi
              </span>
            </div>
          </div>

          <div className="row my-4">
            <div className="col-6">
              <div className="card-wrapper">
                <div className="icon-wrapper-in mb-2">
                  <i className="bi bi-wallet2"></i>
                </div>
                <span className="title">Pemasukkan</span>
                <h4>Rp. {this.state.pemasukkanUang},-</h4>
                <div>
                  <span className="title text-ungu">
                    {this.state.transaksiIN}
                  </span>
                  <span className="title">Transaksi</span>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="card-wrapper">
                <div className="icon-wrapper-out mb-2">
                  <i className="bi bi-cash"></i>
                </div>
                <span className="title">Pengeluaran</span>
                <h4>Rp. {this.state.pengeluaranUang},-</h4>
                <div>
                  <span className="title text-ungu">
                    {this.state.transaksiOUT}
                  </span>
                  <span className="title">Transaksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-12 d-flex justify-content-between align-items-center">
              <h5>Ringkasan Transaksi</h5>
              <div className="wrapper-button">
                <ModalCreate
                  variant="button btn-ungu px-3 py-2 me-2"
                  text="Pemasukkan"
                  icon="bi bi-plus-circle-fill"
                  modaltitle="Tambah Pemasukkan"
                  kategori="IN"
                  action={this.addItem}
                />
                <ModalCreate
                  variant="button btn-pink px-3 py-2"
                  text="Pengeluaran"
                  icon="bi bi-dash-circle-fill"
                  modaltitle="Tambah Pengeluaran"
                  kategori="OUT"
                  action={this.addItem}
                />
              </div>
            </div>
          </div>

          <div className="row">
            {this.state.summary.length == 0 && <Alert />}
            {this.state.summary.map((sum, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-12 d-flex justify-content-between align-items-center mb-3"
                >
                  <div className="d-flex align-items-center">
                    <div
                      className={
                        sum.kategori === "IN"
                          ? "icon-wrapper-in"
                          : "icon-wrapper-out"
                      }
                    >
                      <i
                        className={
                          sum.kategori === "IN"
                            ? "bi bi-wallet2"
                            : "bi bi-bag-dash"
                        }
                      ></i>
                    </div>
                    <div className="transaction ms-3 d-flex flex-column">
                      <h6>{sum.deskripsi}</h6>
                      <span className="title">{sum.tanggal}</span>
                    </div>
                  </div>
                  <h5
                    className={
                      sum.kategori === "IN" ? "text-money-in" : "text-money-out"
                    }
                  >
                    Rp. {sum.nominal},-
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

class Alert extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <h1>Data Masih Kosong</h1>
      </>
    );
  }
}

export default App;
