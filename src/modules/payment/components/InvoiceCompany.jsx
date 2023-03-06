import { Document, Font, Line, Page, StyleSheet, Svg, Text, View, Image } from '@react-pdf/renderer';
import { printNumberWithCommas } from '@/common/utility/printPriceWithComma';
import InvoiceTable from './InvoiceTable';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-lightitalic-webfont.woff',
      fontStyle: 'italic',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
      fontWeight: 500,
    },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontFamily: 'Roboto',
  },
  logo: { width: 50, height: 50 },
  websiteInforContainer: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 8,
    fontWeight: 'light',
    gap: 10,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 8,
    fontWeight: 'normal',
  },
  company: {
    fontSize: 8,
  },
  detailPrice: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    fontWeight: 'medium',
    marginTop: 4,
  },
  thanks: { fontSize: 10, textAlign: 'center' },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
});

function InvoiceCompany({ products, formData }) {
  const totalProductsPrice = products.reduce((acc, cur) => {
    return acc + cur.product.price * cur.amount;
  }, 0);
  const tax = totalProductsPrice * 0.1;
  const totalPrice = totalProductsPrice + tax + 25000;

  return (
    <Document language="vietnamese">
      <Page style={styles.body} size="A6" wrap={false}>
        <View style={styles.websiteInforContainer}>
          <Image src="/assets/images/logo.png" style={styles.logo} alt="logo" />
          <View>
            <Text>Brother Shop</Text>
            <Text>Địa chỉ: 123 Đường Nguyễn Văn A, Khu phố 2, Bến Tre</Text>
            <Text>Số điện thoại: 0349175927</Text>
            <Text>Email: trandinhkhoi102@gmail.com</Text>
          </View>
        </View>
        <Text style={styles.title}>BROTHER SHOP</Text>
        <Text style={styles.subTitle}>HÓA ĐƠN THANH TOÁN</Text>

        <Text style={styles.description}>Ngày: {new Date().toLocaleString()}</Text>
        <Text style={styles.company}>Công ty: {formData.companyName}</Text>
        <Text style={styles.company}>Địa chỉ: {formData.companyAddress}</Text>
        <Text style={styles.company}>Mã số thuế: {formData.companyTaxNumber}</Text>

        <InvoiceTable cartProducts={products} />
        <View style={styles.detailPrice}>
          <Text>Tạm tính</Text>
          <Text>{printNumberWithCommas(totalProductsPrice)}đ</Text>
        </View>
        <View style={styles.detailPrice}>
          <Text>Thuế</Text>
          <Text>{printNumberWithCommas(tax)}đ</Text>
        </View>
        <View style={styles.detailPrice}>
          <Text>Phí vận chuyển</Text>
          <Text>25,000đ</Text>
        </View>
        <View style={styles.detailPrice}>
          <Text>Tổng thanh toán</Text>
          <Text>{printNumberWithCommas(totalPrice)}đ</Text>
        </View>
        <Svg height={20} style={{ marginVertical: 4 }}>
          <Line x1="0" y1="0" x2="260" y2="0" strokeWidth={2} stroke="#000" />
        </Svg>
        <Text style={styles.thanks}>Trân trọng cảm ơn, hẹn gặp lại quý khách</Text>
      </Page>
    </Document>
  );
}

export default InvoiceCompany;
