import { Stack } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/common/components/Buttons/Button';
import { appAssets } from '@/common/assets';
import config from '@/config';

function ServerErrorPage() {
  return (
    <>
      <Head>
        <title>Đã xảy ra lỗi | Brother Shop</title>
      </Head>
      <Stack direction="column" alignItems="center" sx={{ mt: 20, mb: 16 }}>
        <Image src={appAssets.serverError} width={450} height={450} alt="Sản phẩm không tồn tại" />

        <Link href={config.routes.home}>
          <Button className="mt-3" onClick={handleBackToPreviousPage}>
            Trở về trang chủ
          </Button>
        </Link>
      </Stack>
    </>
  );
}

export default ServerErrorPage;
