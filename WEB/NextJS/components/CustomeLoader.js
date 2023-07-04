
import { Audio, LineWave, Puff } from 'react-loader-spinner'

const CustomeLoader = ({ color }) => {

    return (
        <div
            className="d-flex align-items-center"
            style={{
                zIndex: 9999,
                justifyContent: 'center',
                position: 'fixed',
                background: 'rgba(0, 0, 0, 0.1)',
                position: 'fixed',
                top: 0,
                left: 0,
                width: "100%",
                height: '100%'
            }}
        >
            <Puff
                height="130"
                width="130"
                color={color ? color : '#4f56ff'}
                ariaLabel='loading'
            />
        </div>
    );
};

export default CustomeLoader;
