import "../App.css";
import React from "react";
import Modal from "react-bootstrap/Modal";

class ModalCreate extends React.Component {
  constructor() {
    super();

    this.state = {
      show: false,
      deskripsi: "",
      nominal: 0,
      tanggal: "",
      kategori: "",
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tambahItem = this.tambahItem.bind(this);
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }

  handleShow() {
    this.setState({
      show: true,
      kategori: this.props.kategori,
    });
  }

  handleChange(e) {
    const attributeName = e.target.name;
    const attributeValue = e.target.value;
    this.setState({
      [attributeName]: attributeValue,
    });
  }

  tambahItem() {
    const data = {
      deskripsi: this.state.deskripsi,
      nominal: parseInt(this.state.nominal),
      tanggal: this.state.tanggal,
      kategori: this.state.kategori,
    };
    const fnAddItem = this.props.action;
    fnAddItem(data);
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <>
        <button className={this.props.variant} onClick={this.handleShow}>
          {this.props.text}
          <i className={this.props.icon}></i>
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modaltitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Deskripsi</label>
              <input
                type="text"
                className="form-control"
                name="deskripsi"
                placeholder="Masukkan deskripsi"
                value={this.state.deskripsi}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Nominal</label>
              <input
                type="number"
                className="form-control"
                min="0"
                name="nominal"
                value={this.state.nominal}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tanggal</label>
              <input
                type="date"
                className="form-control"
                name="tanggal"
                value={this.state.tanggal}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Kategori</label>
              <input
                type="text"
                className="form-control"
                disabled
                name="kategori"
                value={this.state.kategori}
                onChange={this.handleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className={this.props.variant} onClick={this.tambahItem}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ModalCreate;
