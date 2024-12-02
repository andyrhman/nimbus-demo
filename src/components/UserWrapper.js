import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { setUser } from "@/redux/actions/setUserAction.js";
import axios from "axios";
import Loader from "./Loader.js";
import Navbar from "./Navbar.js";

const UserWrapper = (props) => {
    const [loading, setLoading] = useState(true);
    const { setUser } = props;
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('user');

                props.setUser({
                    id: data.id,
                    nama: data.nama,
                    profile_pic: data.profile_pic,
                    username: data.username,
                    email: data.email,
                    is_user: data.is_user
                });
            } catch (error) {
                if (error.response && [401, 403, 404].includes(error.response.status)) {
                    console.log(error.message)
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [setUser, router]);

    if (loading) {
        return <Loader />;
    }
    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserWrapper);