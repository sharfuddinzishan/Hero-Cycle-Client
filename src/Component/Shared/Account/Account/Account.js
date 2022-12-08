import { useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Reset from '../Reset/Reset';



function Account() {
    // By Default Tooggle means Registration form appear when user click on Account menu 
    const [toggle, setToggle] = useState(false);
    // To Get Reset Form of email 
    const [reset, setReset] = useState(false);

    return (
        <>
            <div className="bg-info">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="col-12 mx-auto pb-0 mb-0">
                                {
                                    reset ? <Reset></Reset> :
                                        toggle ?
                                            <Register></Register>
                                            :
                                            <Login></Login>
                                }
                            </div>
                            <div className="col-12 mb-3 ps-5 pt-0 mt-0 mx-auto">
                                {
                                    reset ? '' :
                                        toggle ?
                                            <>
                                                <div className="form-check">
                                                    <input key={Math.random()} onChange={() => setToggle(!toggle)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        Want To Create New Account?
                                                    </label>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="form-check">
                                                    <input key={Math.random()} onChange={() => setToggle(!toggle)} className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                                        Have Account Already?
                                                    </label>
                                                </div>
                                            </>
                                }
                                <div className="form-check">
                                    <input onChange={() => setReset(!reset)} className="form-check-input" type="checkbox" value="" id="flexCheckReset" />
                                    <label className="form-check-label" htmlFor="flexCheckReset">
                                        Reset?
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <img className="img-fluid pt-5" src="https://i.ibb.co/8Xmh7cd/image.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Container>
                <Grid container columns={{ xs: 4, md: 12 }}>
                    <Grid item xs={4} md={6}>
                        <Grid item xs={4}>
                            {
                                reset ? <Reset></Reset> :
                                    toggle ?
                                        <Register></Register>
                                        :
                                        <Login></Login>
                            }
                        </Grid>
                        <Grid item xs={4}>
                            {
                                reset ? '' :
                                    toggle ?
                                        <>
                                            <FormControlLabel
                                                label="Have Account Already?"
                                                labelPlacement="end"
                                                control={<Checkbox />}
                                                onChange={() => setToggle(!toggle)}
                                            />
                                        </>
                                        :
                                        <>
                                            <FormControlLabel
                                                label="Want To Create New Account?"
                                                labelPlacement="end"
                                                control={<Checkbox />}
                                                onChange={() => setToggle(!toggle)}
                                            />
                                        </>
                            }
                            <>
                                <FormControlLabel
                                    label="Reset?"
                                    labelPlacement="end"
                                    control={<Checkbox />}
                                    onChange={() => setReset(!reset)}
                                />
                            </>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} md={6}>
                        <img width="100%" src="https://i.ibb.co/8Xmh7cd/image.png" alt="" />
                    </Grid>
                </Grid>
            </Container> */}
        </>
    );
}

export default Account;
