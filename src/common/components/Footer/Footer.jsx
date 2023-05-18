import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { HCMCityAddress, southEastAddress, southWestAddress } from '@/data/address';
import CollapseFooter from './CollapseFooter';
import { Box, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/styles';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { appAssets } from '@/common/assets';

function Footer() {
  const theme = useTheme();

  return (
    <Box
      className="py-5 text-lightGray100"
      sx={{ backgroundColor: theme.palette.grey['900'], color: theme.palette.grey['400'] }}
    >
      <Container maxWidth="xl">
        <Box>
          <Box sx={{ textAlign: 'center' }}>
            <Image src={appAssets.logo} alt="" className="h-[120px] w-[120px] mx-auto" width={100} height={100} />
          </Box>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography>Đặt hàng và thu tiền tận nơi toàn quốc</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              (028) 9721 4431
            </Typography>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSfwI5hLaOdzOL8xz-rlUxpCTfrMitJRz3Z4N3Nbd8eZItVglQ/viewform"
              target="_blank"
              rel="noreferrer"
            >
              Than phiền/Góp ý
            </Link>
            <CollapseFooter />
            <Grid container sx={{ marginY: 3 }}>
              <Grid item xs={12} md={4}>
                <Box>
                  <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }} className="mb-4 mt-3">
                    <FontAwesomeIcon icon={faMapLocation} /> TÂY NAM BỘ
                  </Typography>
                  <Box>
                    {southWestAddress.map((address, index) => (
                      <Box key={index} sx={{ mt: 1.5, textAlign: 'left', fontSize: '13px' }}>
                        <LocationOnOutlinedIcon /> {address}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }} className="mb-4 mt-3">
                    <FontAwesomeIcon icon={faMapLocation} /> ĐÔNG NAM BỘ
                  </Typography>
                  <Box>
                    {southEastAddress.map((address, index) => (
                      <Box key={index} sx={{ mt: 1.5, textAlign: 'left', fontSize: '13px' }}>
                        <LocationOnOutlinedIcon /> {address}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box>
                  <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }} className="mb-4 mt-3">
                    <FontAwesomeIcon icon={faMapLocation} /> TP HỒ CHÍ MINH
                  </Typography>
                  <Box>
                    {HCMCityAddress.map((address, index) => (
                      <Box key={index} sx={{ mt: 1.5, textAlign: 'left', fontSize: '13px' }}>
                        <LocationOnOutlinedIcon /> {address}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: { md: 'flex' }, alignItems: 'center', textAlign: { xs: 'center', md: 'left' }, mt: 5 }}>
            <Box width={'100%'}>
              <Typography>© {new Date().getFullYear()} - CÔNG TY TNHH BROTHER VN</Typography>
              <Typography sx={{ fontSize: '9px' }}>
                Giấy CNĐKDN: 0310874914 – Ngày cấp: 25/11/2011 - Cơ quan cấp: Phòng Đăng Ký Kinh Doanh – Sở Kế Hoạch và
                Đầu Tư TP.HCM
              </Typography>
              <Typography sx={{ fontSize: '9px' }}>
                Địa chỉ đăng ký kinh doanh: 766/3B-3C Sư Vạn Hạnh (Nối dài), Phường 12, Quận 10, TP.HCM - Điện thoại:
                (028) 3868 4857 - Mua hàng: (028) 7307 1441 - Email: cskh@yame.vn
              </Typography>
            </Box>
            <Image alt="" src="https://res.yame.vn/dathongbao.png" width={150} height={150} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
