const Connection = require('../db.js');

/**
 * Filter a list of services by a keyword string.
 * @param {Array} services [array of service objects, must have name attribute]
 * @param {string} keyword [keyword used to filter search] 
 */
const filterServicesByKeyword = (services, keyword) => {
    try {
        if (keyword instanceof string) {
            if (services instanceof Array) {

                let matchedServices = []
    
                for (let i=0; i<services.length; i++) {
                    if (services[i].name.includes(keyword)) {
                        matchedServices.push(services[i])
                    }
                }

            } else {
                // services is not an array 
                throw new Error("Services must be an array.")
            }
        } else {
            // Keyword is not a string
            throw new Error("Keyword is not a string.")
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * Pass in a list of businessIds to get all 
 * services and optionally a keyword to filter search results
 * @param {Array} businessIDs 
 * @param {string} keyword
 */
const getBusinessServices = async (businessIDs, keyword) => {
    try {

        const con = new Connection()
        const { rows } = await con.query(`SELECT * FROM Services WHERE businessId IN($1)`, businessIDs)
        
        let services = [...rows]

        // if keyword used, filter
        if (keyword) {
            services = filterServicesByKeyword(rows)
        }    

        return services

    } catch (error) {
        console.log(error)
    }
    
}

module.exports = getBusinessServices