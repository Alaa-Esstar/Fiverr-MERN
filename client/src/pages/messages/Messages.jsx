import React from 'react'
import "./Messages.scss"
import { Link } from "react-router-dom"

const Messages = () => {
    const message = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ad nihil quos et quibusdam. Iste doloribus omnis vel! Quia iusto praesentium autem soluta nesciunt quo nostrum at eos quis vero"
    return (
        <div className='messages'>
            <div className="container">
                <div className="title">
                    <h1>Messages</h1>
                </div>
                <table>
                    <tr>
                        <th>Buyer</th>
                        <th>Last Message</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                    <tr className='active'>
                        <td>
                            John Doe
                        </td>
                        <td>
                            <Link className='link' to="/message/123">
                                {message.substring(0, 100)} ...
                            </Link>
                        </td>
                        <td>1 day ago</td>
                        <td>
                            <button>Mark as Read</button>
                        </td>
                    </tr>
                    <tr className='active'>
                        <td>
                            John Doe
                        </td>
                        <td>
                            <Link className='link' to="/message/123">
                                {message.substring(0, 100)} ...
                            </Link>
                        </td>
                        <td>1 day ago</td>
                        <td>
                            <button>Mark as Read</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            John Doe
                        </td>
                        <td>
                            <Link className='link' to="/message/123">
                                {message.substring(0, 100)} ...
                            </Link>
                        </td>
                        <td>1 day ago</td>
                    </tr>
                    <tr>
                        <td>
                            John Doe
                        </td>
                        <td>
                            <Link className='link' to="/message/123">
                                {message.substring(0, 100)} ...
                            </Link>
                        </td>
                        <td>1 day ago</td>
                    </tr>
                    <tr>
                        <td>
                            John Doe
                        </td>
                        <td>
                            <Link className='link' to="/message/123">
                                {message.substring(0, 100)} ...
                            </Link>
                        </td>
                        <td>1 day ago</td>
                    </tr>
                    <tr>
                        <td>
                            John Doe
                        </td>
                        <td>
                            <Link className='link' to="/message/123">
                                {message.substring(0, 100)} ...
                            </Link>
                        </td>
                        <td>1 day ago</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Messages