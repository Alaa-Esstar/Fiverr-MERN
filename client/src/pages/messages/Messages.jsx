import React from 'react'
import "./Messages.scss"
import { Link } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import moment from "moment"

const Messages = () => {
    const message = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ad nihil quos et quibusdam. Iste doloribus omnis vel! Quia iusto praesentium autem soluta nesciunt quo nostrum at eos quis vero"
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const { isLoading, error, data } = useQuery({
        queryKey: ['conversations'],
        queryFn: () =>
            newRequest.get(`/conversations`).then(res => {
                return res.data;
            })
    })

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (id) => {
            return newRequest.put(`/conversations/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["conversations"])
        }
    })

    const handleRead = (id) => {
        mutation.mutate(id)
    }
    return (
        <div className='messages'>
            {isLoading ? "loading" : error ? "error" :
                <div className="container">
                    <div className="title">
                        <h1>Messages</h1>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                                <th>Last Message</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((c) => (
                                <tr className={((currentUser.isSeller && !c.readBySeller) ||
                                    (!currentUser.isSeller && !c.readByBuyer)) ? 'active' : ""}
                                    key={c._id}>
                                    <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                                    <td>
                                        <Link className='link' to={`/message/${c.id}`}>
                                            {c?.lastMessage?.substring(0, 100)} ...
                                        </Link>
                                    </td>
                                    <td>{moment(c.updateAt).fromNow()} 1 day ago</td>
                                    <td>{((currentUser.isSeller && !c.readBySeller) ||
                                        (!currentUser.isSeller && !c.readByBuyer)) && (
                                            <button onClick={() => handleRead(c.id)}>Mark as Read</button>
                                        )
                                    }</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            }

        </div>
    )
}

export default Messages