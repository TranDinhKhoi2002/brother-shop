function BranchList({ onChange }) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="mt-4 block w-full h-[43px] px-3 text-base leading-6 font-normal bg-white bg-clip-padding border-[1px] border-solid border-[#ced4da] rounded outline-none transition-[border-color] duration-150 ease-in-out"
    >
      <option value="">Chọn cửa hàng nhận hàng</option>
      <optgroup label="Tp. Hồ Chí Minh">
        <option value="YaMe Q.10: 770F, Sư Vạn Hạnh (nd), P.12">YaMe Q.10: 770F, Sư Vạn Hạnh (nd), P.12</option>
        <option value="YaMe Q.5: 190, Nguyễn Trãi, P.3">YaMe Q.5: 190, Nguyễn Trãi, P.3</option>
        <option value="YaMe Q.7: 323 Huỳnh Tấn Phát">YaMe Q.7: 323 Huỳnh Tấn Phát</option>
        <option value="YaMe Q.6: 102 Hậu Giang">YaMe Q.6: 102 Hậu Giang</option>
        <option value="YaMe Q.9 (1): 114 Đỗ Xuân Hợp">YaMe Q.9 (1): 114 Đỗ Xuân Hợp</option>
        <option value="YaMe Q.9 (2): 200 Lê Văn Việt P.Tăng Nhơn Phú B">
          YaMe Q.9 (2): 200 Lê Văn Việt P.Tăng Nhơn Phú B
        </option>
        <option value="YaMe Q.BT: 138 Đinh Tiên Hoàng, P.1">YaMe Q.BT: 138 Lê Văn Duyệt, P.1</option>
        <option value="YaMe Tân Phú (2): 189, Hòa Bình">YaMe Tân Phú (2): 189, Hòa Bình</option>
        <option value="YaMe Gò Vấp (1): 407, Quang Trung, P.10">YaMe Gò Vấp (1): 407, Quang Trung, P.10</option>
        <option value="YaMe Gò Vấp (2): 1096 Quang Trung, Gò Vấp">YaMe Gò Vấp (2): 1096 Quang Trung, Gò Vấp</option>
        <option value="YaMe Q.Bình Tân: 232 Lê Văn Qưới">YaMe Q.Bình Tân: 232 Lê Văn Qưới</option>
        <option value="YaMe Hóc Môn: 39 Quang Trung, Thới Tam Thôn">YaMe Hóc Môn: 39 Quang Trung, Thới Tam Thôn</option>
        <option value="YaMe Thủ Đức: 336, Võ Văn Ngân, Q. Thủ Đức">YaMe Thủ Đức: 336, Võ Văn Ngân, Q. Thủ Đức</option>
      </optgroup>
      <optgroup label="Đông Nam Bộ">
        <option value="YaMe Biên Hòa: 30, Dương Tử Giang, Tp. Biên Hòa">
          YaMe Biên Hòa: 30, Dương Tử Giang, Tp. Biên Hòa
        </option>
        <option value="YaMe TX. Dĩ An: 82A Nguyễn An Ninh">YaMe TX. Dĩ An: 82A Nguyễn An Ninh</option>
        <option value="YaMe Tx. Thuận An, Bình Dương: 132 Ngô Quyền">
          YaMe Tx. Thuận An, Bình Dương: 132 Ngô Quyền
        </option>
        <option value="YaMe Bình Dương: 187, Yersin, Tp.Thủ Dầu Một">
          YaMe Bình Dương: 187, Yersin, Tp.Thủ Dầu Một
        </option>
        <option value="YaMe Vũng Tàu: 528 Trương Công Định">YaMe Vũng Tàu: 528 Trương Công Định</option>
        <option value="YaMe Tây Ninh: 586 Cách Mạng Tháng 8 P.3">YaMe Tây Ninh: 586 Cách Mạng Tháng 8 P.3</option>
      </optgroup>
      <optgroup label="Tây Nam Bộ">
        <option value="YaMe Cần Thơ: 57 Nguyễn Trãi, Q. Ninh kiều">YaMe Cần Thơ: 57 Nguyễn Trãi, Q. Ninh kiều</option>
        <option value="YaMe Cần Thơ 2: 45 đ.3 Tháng 2, Q.Ninh Kiều">YaMe Cần Thơ 2: 45 đ.3 Tháng 2, Q.Ninh Kiều</option>
        <option value="YaMe Tân An: 492 Hùng Vương">YaMe Tân An: 492 Hùng Vương</option>
        <option value="YaMe Mỹ Tho: 193N đường Ấp Bắc, P.5">YaMe Mỹ Tho: 193N đường Ấp Bắc, P.5</option>
        <option value="YaMe Vĩnh Long: 27A Phạm Thái Bường">YaMe Vĩnh Long: 27A Phạm Thái Bường</option>
        <option value="YaMe Bến Tre:209 Đồng Khởi Tp.Bến Tre">YaMe Bến Tre:209 Đồng Khởi Tp.Bến Tre</option>
        <option value="YaMe Cao Lãnh: 66A Tôn Đức Thắng">YaMe Cao Lãnh: 66A Tôn Đức Thắng</option>
        <option value="YaMe Sa Đéc: 289 Nguyễn Sinh Sắc">YaMe Sa Đéc: 289 Nguyễn Sinh Sắc</option>
        <option value="YaMe Trà Vinh: 09 Nguyễn Đáng">YaMe Trà Vinh: 09 Nguyễn Đáng</option>
        <option value="YaMe Long Xuyên: 47 Tôn Đức Thắng, P. Mỹ Bình">
          YaMe Long Xuyên: 47 Tôn Đức Thắng, P. Mỹ Bình
        </option>
        <option value="YaMe Rạch Giá: 290 Nguyễn Trung Trực, Tp. Rạch Giá">
          YaMe Rạch Giá: 290 Nguyễn Trung Trực, Tp. Rạch Giá
        </option>
        <option value="YaMe Sóc Trăng: 126 Tôn Đức Thắng">YaMe Sóc Trăng: 126 Tôn Đức Thắng</option>
        <option value="YaMe Cà Mau: 11 Trần Hưng Đạo">YaMe Cà Mau: 11 Trần Hưng Đạo</option>
      </optgroup>
      <optgroup label="Tây Nguyên">
        <option value="YaMe Buôn Ma Thuột: 64 Phan Chu Trinh, Tp.BMT">
          YaMe Buôn Ma Thuột: 64 Phan Chu Trinh, Tp.BMT
        </option>
      </optgroup>
    </select>
  );
}

export default BranchList;
