import PropTypes from 'prop-types';

function DeliveryMethods({ onChange, codShip }) {
  return (
    <div>
      <div className="flex items-center">
        <input
          onChange={onChange}
          checked={codShip}
          name="choosePickupAddress"
          type="radio"
          id="shipToHome"
          className="!w-[16px] !h-8"
        />
        <label htmlFor="shipToHome" className="!mb-0 ml-2">
          Nhận hàng tại nhà/công ty/bưu điện
        </label>
      </div>
      <div className="flex items-center">
        <input
          onChange={onChange}
          checked={!codShip}
          name="choosePickupAddress"
          type="radio"
          id="pickFromShop"
          className="!w-[16px] !h-8"
        />
        <label htmlFor="pickFromShop" className="!mb-0 ml-2">
          Nhận hàng tại cửa hàng YaMe gần nhất
        </label>
      </div>
    </div>
  );
}

DeliveryMethods.propTypes = {
  onChange: PropTypes.func.isRequired,
  codShip: PropTypes.bool.isRequired,
};

export default DeliveryMethods;
