import { useState, useRef } from 'react';

function GuidanceSize(props) {
  const [message, setMessage] = useState({ text: '', color: 'red' });
  const weightInputRef = useRef();
  const heightInputRef = useRef();

  function searchSizeHandler(e) {
    e.preventDefault();

    checkSize();
  }

  function checkSize() {
    const enteredWeight = weightInputRef.current.value;
    const enteredHeight = heightInputRef.current.value;

    if (!enteredWeight.trim() || !enteredHeight.trim()) {
      setMessage({
        color: 'red',
        text: 'Vui lòng nhập đầy đủ thông tin trước khi tìm kiếm',
      });
      return;
    }

    if (isNaN(enteredWeight)) {
      setMessage({
        color: 'red',
        text: 'Vui lòng nhập cân nặng là một số',
      });
      return;
    }

    if (isNaN(enteredHeight)) {
      setMessage({
        color: 'red',
        text: 'Vui lòng nhập chiều cao là một số',
      });
      return;
    }

    if (+enteredWeight >= 48 && +enteredWeight <= 54 && +enteredHeight >= 155 && +enteredHeight <= 159) {
      setMessage({
        color: 'green',
        text: 'Size S là phù hợp nhất dành cho bạn',
      });
      return;
    }

    if (+enteredWeight >= 55 && +enteredWeight <= 61 && +enteredHeight >= 160 && +enteredHeight <= 165) {
      setMessage({
        color: 'green',
        text: 'Size M là phù hợp nhất dành cho bạn',
      });
      return;
    }

    if (+enteredWeight >= 62 && +enteredWeight <= 68 && +enteredHeight >= 166 && +enteredHeight <= 172) {
      setMessage({
        color: 'green',
        text: 'Size L là phù hợp nhất dành cho bạn',
      });
      return;
    }

    if (+enteredWeight >= 69 && +enteredWeight <= 75 && +enteredHeight >= 172 && +enteredHeight <= 177) {
      setMessage({
        color: 'green',
        text: 'Size XL là phù hợp nhất dành cho bạn',
      });
      return;
    }

    setMessage({
      color: '',
      text: 'Chưa có dữ liệu. Chúng tôi không tìm thấy size phù hợp cho bạn',
    });
  }

  return (
    <div className="mt-6">
      <b>Hướng dẫn chọn size</b>
      <form className="flex gap-12 mt-3" onSubmit={searchSizeHandler}>
        <div className="relative">
          <input
            ref={weightInputRef}
            placeholder="Cân nặng"
            className="w-full py-1 px-2 text-sm border-[1px] rounded-l-[4px] border-r-0 border-[#ced4da] outline-none"
          />
          <div className="absolute flex items-center left-full top-0 h-[30px] leading-[30px] text-[#495057] bg-[#e9ecef] py-1 px-2 border-[1px] border-[#ced4da]">
            <span>Kg</span>
          </div>
        </div>
        <div className="relative">
          <input
            ref={heightInputRef}
            placeholder="Chiều cao"
            className="w-full py-1 px-2 text-sm border-[1px] rounded-l-[4px] border-r-0 border-[#ced4da] outline-none"
          />
          <div className="absolute flex items-center left-full top-0 h-[30px] leading-[30px] text-[#495057] bg-[#e9ecef] py-1 px-2 border-[1px] border-[#ced4da]">
            <span>Cm</span>
          </div>
        </div>
        <button className="h-[30px] leading-[10px] py-1 px-3 ml-2 bg-[#343a40] border-[#343a40] text-white rounded-[4px]">
          Tìm
        </button>
      </form>
      <p style={{ color: `${message.color}`, marginTop: '12px' }}>{message.text}</p>
    </div>
  );
}

export default GuidanceSize;
