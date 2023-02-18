import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { HCMCityAddress, southEastAddress, southWestAddress } from '@/data/address';
import CollapseFooter from './CollapseFooter';

function Footer() {
  return (
    <div className="py-5 bg-[#111] text-[#e4e4e4]">
      <div className="container mx-auto px-4">
        <div>
          <div className="text-center mx-auto">
            <Image
              src="https://res.yame.vn/Content/images/yame-f-logo-white.png"
              alt=""
              className="h-[70px] mx-auto"
              width={100}
              height={100}
            />
          </div>
          <div className="text-center mt-3 px-[8%]">
            <p>Đặt hàng và thu tiền tận nơi toàn quốc</p>
            <h5 className="text-xl font-medium mb-2">(028) 7307 1441</h5>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfwI5hLaOdzOL8xz-rlUxpCTfrMitJRz3Z4N3Nbd8eZItVglQ/viewform"
              target="_blank"
              rel="noreferrer"
            >
              Than phiền/Góp ý
            </a>
            <CollapseFooter />
            <div className="grid md:grid-cols-3 grid-cols-1 mt-6">
              <div className="">
                <div>
                  <h6 className="text-left text-base font-medium mb-4 mt-3">
                    <FontAwesomeIcon icon={faMapLocation} /> TÂY NAM BỘ
                  </h6>
                  <div>
                    {southWestAddress.map((address, index) => (
                      <p key={index} className="text-left mt-3 text-[13px]">
                        <i
                          className="w-4 h-4 inline-block"
                          style={{
                            backgroundImage:
                              "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiBQoDAgF3cpNwAAAA70lEQVQoz6XQzyqEcRTG8c95Z0j+RjTTWGBJuQBs2ShKuQzX4w7sLEZyBVNqlkoWNqMky5HRmBHvz8KMXrHzbE49fZ/OOU/4VoKq8Eh8u5mi5h3YNlO0fgJJSVPnF5CkSLMqqibtWlVNcykSiMHuDWsqOs7l9k1ou3ZJKCfYsuxExY4xJV2nnh0qaSSR2LSsrosV63JX7jHuUEujjJq2nmkdrWiRCFNePFkkEqP21OSOpTAAjox4UNfPgjcXbr0X2gnvbpzph4ygp6lbAHjV1ItfRf2h/wPlwfywYFeehrF5H8N7vx7LLJkoBLvu5IFPD8BHPpwYdgUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDUtMTBUMDM6MDI6MDEtMDQ6MDA8Zfw7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA1LTEwVDAzOjAyOjAxLTA0OjAwTThEhwAAAABJRU5ErkJggg==')",
                          }}
                        />{' '}
                        {address}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="">
                <div>
                  <h6 className="text-left text-base font-medium mb-4 mt-3">
                    <FontAwesomeIcon icon={faMapLocation} /> ĐÔNG NAM BỘ VÀ TÂY NGUYÊN
                  </h6>
                  <div>
                    {southEastAddress.map((address, index) => (
                      <p key={index} className="text-left mt-3 text-[13px]">
                        <i
                          className="w-4 h-4 inline-block"
                          style={{
                            backgroundImage:
                              "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiBQoDAgF3cpNwAAAA70lEQVQoz6XQzyqEcRTG8c95Z0j+RjTTWGBJuQBs2ShKuQzX4w7sLEZyBVNqlkoWNqMky5HRmBHvz8KMXrHzbE49fZ/OOU/4VoKq8Eh8u5mi5h3YNlO0fgJJSVPnF5CkSLMqqibtWlVNcykSiMHuDWsqOs7l9k1ou3ZJKCfYsuxExY4xJV2nnh0qaSSR2LSsrosV63JX7jHuUEujjJq2nmkdrWiRCFNePFkkEqP21OSOpTAAjox4UNfPgjcXbr0X2gnvbpzph4ygp6lbAHjV1ItfRf2h/wPlwfywYFeehrF5H8N7vx7LLJkoBLvu5IFPD8BHPpwYdgUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDUtMTBUMDM6MDI6MDEtMDQ6MDA8Zfw7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA1LTEwVDAzOjAyOjAxLTA0OjAwTThEhwAAAABJRU5ErkJggg==')",
                          }}
                        />{' '}
                        {address}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="">
                <div>
                  <h6 className="text-left text-base font-medium mb-4 mt-3">
                    <FontAwesomeIcon icon={faMapLocation} /> TP. HCM
                  </h6>
                  <div>
                    {HCMCityAddress.map((address, index) => (
                      <p key={index} className="text-left mt-3 text-[13px]">
                        <i
                          className="w-4 h-4 inline-block"
                          style={{
                            backgroundImage:
                              "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiBQoDAgF3cpNwAAAA70lEQVQoz6XQzyqEcRTG8c95Z0j+RjTTWGBJuQBs2ShKuQzX4w7sLEZyBVNqlkoWNqMky5HRmBHvz8KMXrHzbE49fZ/OOU/4VoKq8Eh8u5mi5h3YNlO0fgJJSVPnF5CkSLMqqibtWlVNcykSiMHuDWsqOs7l9k1ou3ZJKCfYsuxExY4xJV2nnh0qaSSR2LSsrosV63JX7jHuUEujjJq2nmkdrWiRCFNePFkkEqP21OSOpTAAjox4UNfPgjcXbr0X2gnvbpzph4ygp6lbAHjV1ItfRf2h/wPlwfywYFeehrF5H8N7vx7LLJkoBLvu5IFPD8BHPpwYdgUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDUtMTBUMDM6MDI6MDEtMDQ6MDA8Zfw7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA1LTEwVDAzOjAyOjAxLTA0OjAwTThEhwAAAABJRU5ErkJggg==')",
                          }}
                        />{' '}
                        {address}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex items-center text-center md:text-left px-[8%] mt-6">
            <div className="md:w-[80%]">
              <p>© 2022 - CÔNG TY TNHH YAME VN</p>
              <p className="text-[9px]">
                Giấy CNĐKDN: 0310874914 – Ngày cấp: 25/11/2011 - Cơ quan cấp: Phòng Đăng Ký Kinh Doanh – Sở Kế Hoạch và
                Đầu Tư TP.HCM
              </p>
              <p className="text-[9px]">
                Địa chỉ đăng ký kinh doanh: 766/3B-3C Sư Vạn Hạnh (Nối dài), Phường 12, Quận 10, TP.HCM - Điện thoại:
                (028) 3868 4857 - Mua hàng: (028) 7307 1441 - Email: cskh@yame.vn
              </p>
            </div>
            <div className="mt-3 flex justify-center">
              <a href="http://online.gov.vn/Home/WebDetails/1840" target="_blank" rel="noreferrer">
                <Image
                  className="w-full max-w-[150px]"
                  alt=""
                  src="https://res.yame.vn/dathongbao.png"
                  width={100}
                  height={100}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
