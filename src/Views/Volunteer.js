import { Button, Container, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import CustomCard from "../Components/CustomCard";
import {getAllRequests, getCategories, getCities, getStates, getBloodGroups, getHomeDetails} from "../Api/api";
import Drawer from "../Components/Drawer";
import Autocomplete from "../Components/AutoComplete";
import Select from "../Components/Select";
import Alert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';

const Volunteer = () => {

    const [data, setData] = React.useState([]);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [filter, setFilter] = React.useState({selectedC: []});
    const [cities, setCities] = React.useState([]);
    const [selectedCity, setSelectedCity] = React.useState("all");
    const [totalCount, setTotalCount] = React.useState(0);
    const [states, setStates] = React.useState([]);
    const [selectedState, setSelectedState] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [bloodGroups, setBloodGroups] = React.useState([]);
    const [selectedBloodGroup, setSelectedBloodGroup] = React.useState("");
    const [totalHelpCount, setTotalHelpCount] = React.useState(0);
    const [selectedPage, setSelectedPage] = React.useState(1);
    const [callApi, setCallApi] = React.useState(false);

    const handleCategory = (e) => {
        if(filter.selectedC.includes(e.target.value)){
            // removeItem(e.target.value)
            setFilter({...filter, selectedC:filter.selectedC.filter(item => item !== e.target.value)});
        }
        else
            setFilter({...filter, selectedC:[...filter.selectedC, e.target.value]});
    }

    const removeItem =(value) => {
        var oldFilter = [...filter.selectedC];
        var newFilter = oldFilter.filter(item => item !== value)
        setFilter({...filter, selectedC: newFilter});
    }

    const handleCloseDrawer = () => {
        setOpenDrawer(false)
    }

    const handleCardClick = (help) => {
        window.location.href= "/help/" + help.code
    }

    const updateSelectedFilters = (array) => {
        var categoryArray = array.map(function(el) {
            return el.category_name;
          });
        setFilter({selectedC: categoryArray})
    }


    const onClickSearch = (page) => {
        var params = {
            category: selectedCategory,
            city: selectedCity,
            helpType: selectedCategory,
            bloodGroup: selectedBloodGroup,
            state: selectedState,
            page: page
        }
        getAllRequests(params)
            .then(data => {
                setData(data.data.rows)
                setTotalCount(data.data.count)
                setSelectedPage(1)
            })
            .catch(err => {
            })
    }

    const secondarySelect = (state) => {
        var params = {
            category: selectedCategory,
            city: selectedCity,
            helpType: selectedCategory,
            bloodGroup: selectedBloodGroup,
            state: state
        }
        getAllRequests(params)
            .then(data => {
                setData(data.data.rows)
                setTotalCount(data.data.count)
                setSelectedPage(1)
            })
            .catch(err => {
            })
    }

    // React.useEffect(() => {
    //     var params = {
    //         category: selectedCategory,
    //         city: selectedCity,
    //         helpType: selectedCategory,
    //         bloodGroup: selectedBloodGroup,
    //     }
    //     getAllRequests(params)
    //         .then(data => {
    //             console.log(data)
    //             setData(data.data.rows)
    //             setTotalCount(data.data.count)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    //     console.log(filter)
    // },[filter, selectedCity]);

    React.useEffect(() => {
        
        getCategories()
            .then(data => {
                setCategories(data.data)
            })
            .catch(err => {
            })
        
        getStates()
            .then(data => {
                setStates(data.data)
            })
            .catch(err => {
            })

        getBloodGroups()
            .then(data => {
                setBloodGroups(data.data)
            })
            .catch(err => {
            })

        getHomeDetails()
            .then(data => {
                setTotalHelpCount(data.count)
            })
            .catch(err => {
            })
    },[])

    React.useEffect(() => { 
        getCities({
            state: selectedState
        })
            .then(data => {
                setCities(data.data);
                window.scrollTo({top: 0, behavior: "smooth"})
            })
            .catch(err => {
            })
    },[selectedState]);

    React.useEffect(() => {
        if(callApi ){
            var params = {
                category: selectedCategory,
                city: selectedCity,
                helpType: selectedCategory,
                bloodGroup: selectedBloodGroup,
                state: selectedState,
                page: selectedPage
            }
            getAllRequests(params)
                .then(data => {
                    setData(data.data.rows)
                    setTotalCount(data.data.count)
                    setCallApi(false)
                })
                .catch(err => {
                })
        }
        
    },[callApi])
    

    return(
        <Container>
            <div>
                <Typography style={{textAlign: "center", fontSize: '28px', marginTop : 0, marginBottom: 30}}>Amplify</Typography>
                <div
          style={{
            padding: "5px",
            textAlign: "center",
            marginBottom: "20px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "10px",
            paddingBottom: "10px",
            backgroundColor: "rgb(245, 191, 157)",
          }}
        >
          Seek help from perfect strangers to locate beds, ICUs, oxygen
          cylinders, plasma donors etc
          <Button
            color="primary"
            variant="contained"
            size="medium"
            style={{
              marginTop: "20px",
            }}
          >
            Post a new request
          </Button>
        </div>

           <div
          style={{
            padding: "5px",
            textAlign: "center",
            marginBottom: "20px",
            paddingLeft: "25px",
            paddingRight: "25px",
            paddingTop: "10px",
            fontSize: " 15px",
            fontWeight: "400",
          }}
        >
          Search patients looking for help based on location or help category
        </div>

                <Alert severity="success">{totalHelpCount} total patients looking for help.<p style={{margin: 0, fontSize: 12}}>Help us Reduce this number</p></Alert>
                <div style={{padding: "10px", textAlign: "center", marginBottom: "20px"}}>
                    <div style={{marginTop: "10px"}}>
                        <Select value={selectedState} handleOnChange={(e) => setSelectedState(e.target.value)} data={states} valueIdentifier="name" placeholder={"Enter your State"} />
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <Select value={selectedCity} handleOnChange={(e) => setSelectedCity(e.target.value)} data={cities} valueIdentifier="city" placeholder={"Enter your City"} />
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <Select handleOnChange={(e) => setSelectedCategory(e.target.value)} data={categories} valueIdentifier="category_name" placeholder={"Select Help Type"} />
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <Select handleOnChange={(e) => setSelectedBloodGroup(e.target.value)} data={bloodGroups} valueIdentifier="type" placeholder={"Select Blood Group"} />
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <Button onClick={() => onClickSearch(1)} color="primary" variant="contained" size="large" fullWidth style={{borderRadius: "10px"}}> Search</Button>
                    </div>

                </div>
                {false && 
                    <div style={{padding: "10px", textAlign: "center", border: "1px solid black", marginBottom: "20px"}}>
                        <Typography onClick={() => setOpenDrawer(true)}>Filter</Typography>
                    </div>
                }
                {totalCount> 0 && <Typography style={{color: "rgba(0, 0, 0, 0.54)"}}>Showing {totalCount} results</Typography>}
                {data.map((help, index) => 
                    <CustomCard key={index} cardInfo={help} onClick={handleCardClick} />
                )}
                {totalCount>0 && 
                    <div style={{display: "flex", justifyContent: "center", margin: "20px 0px"}}>
                        <Pagination value={selectedPage} count={Math.ceil(totalCount/10)} onChange={(e, page) => {setSelectedPage(page); setCallApi(true)}} />
                    </div>
                }
                <Divider />
                
              
                <Drawer filter={filter} open={openDrawer} handleCloseDrawer={handleCloseDrawer} categories={categories} handleCategory={handleCategory} />
            </div>
            <div   style={{
            padding: "5px",
            textAlign: "center",
            marginBottom: "20px",
            paddingLeft: "25px",
            paddingRight: "25px",
            paddingTop: "10px",
            fontSize: " 15px",
            fontWeight: "400",
          }}
        >
            <h2>Amplify call for help</h2>
            <p style={{
            padding: "5px",
            textAlign: "center",
            marginBottom: "20px",
            paddingLeft: "25px",
            paddingRight: "25px",
            paddingTop: "10px",
            fontSize: " 15px",
            fontWeight: "400",
          }}>No patient should suffer just because their call for help is not reaching those people who can help.

Use this free platform to post a request for help and we will amplify your message across social media and volunteer channels. Use the link to request to share among your network of well-wishers.

<p>Benefits - </p>

<p>: Reach out to millions of help providers and volunteers in a second.</p> 
<p>: Mobile numbers of patient and help providers remain anonymous.</p>
<p>: See how many people are actively tracking your case to help you. </p>
<p>: Everyone gets to know when help reaches the patient, saves effort. </p>
<p>: System automatically locates resources from other websites.</p>
           </p>
            </div>
        </Container>
    )
}

export default Volunteer;