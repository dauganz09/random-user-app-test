import React from 'react'



interface UserBoxProps {
    fullname : string;
    address : string;
    img : string;
}

export const UserBox: React.FC<UserBoxProps> = ({fullname,address,img}) => {

    return (
        <div className='user'>
            <img src={img} alt="" />
            <span>Fullname:</span>
            <p>{fullname}</p>

            <span>Address: </span>
            <p>{address}</p>

        </div>
    )
}
