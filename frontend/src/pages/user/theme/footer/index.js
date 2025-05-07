import { memo } from "react"
import "./style.scss"
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaPhone } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-features">
            <div className="feature">
              <h3>CAM KẾT CHÍNH HÃNG</h3>
              <p>Cam kết sản phẩng chính hãng từ các thương hiệu</p>
            </div>
            <div className="feature">
              <h3>GIAO HÀNG HỎA TỐC</h3>
              <p>Ship hàng đi trong vòng 24h kể từ khi đặt hàng</p>
            </div>
            <div className="feature">
              <h3>HỖ TRỢ 24/24</h3>
              <p>Hotline: 0123456789</p>
              <p>Tất cả các ngày</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>PHONG NHÍ</h2>
              <div className="footer-social">
                <a href="#" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" aria-label="YouTube">
                  <FaYoutube />
                </a>
                <a href="#" aria-label="Twitter">
                  <FaTwitter />
                </a>
              </div>
            </div>

            <div className="footer-contact">
              <h3>HỆ THỐNG CỬA HÀNG</h3>
              <p>58 Mỗ Lao, Hà Đông, Hà Nội</p>
              <p>Vincom Royal City Thanh Xuân, Hà Nội</p>
              <p>The New Playground, Q4, Quận 1, HCM</p>
              <div className="hotline">
                <FaPhone /> Hỗ trợ / Mua hàng: <a href="tel:0123456789">0123456789</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2023 Phong Nhí. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)

