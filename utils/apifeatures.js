
class APIFeatures{
    constructor(query,queryStr){
      this.query = query;
      this.queryStr = queryStr;
    }
  
    filter(){
  // <------------1. Filtering-------------------------->
    const queryObj = {...this.queryStr};
    // <-----1.1  Remove Unwanted query e.g., page,sort,fields,limit
    
    const excludeFields = ["page","sort","limit","fields"];
    excludeFields.forEach((el)=>delete queryObj[el]);
  
    console.log(this.query, queryObj);
  
    // <--------1.2  Advanced filtering--------->
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|lte|lt)\b/g,(match) => `$${match}`);
    console.log(JSON.parse(queryStr));
  
    //<--------Bulid query =>Select*from tours where duration = 5-------->
     this.query = this.query.find(JSON.parse(queryStr));//Select*From tours where
  
     return this;
    }
  
    sort(){
      //<---------2. Sorting----------->
    if(this.queryStr.sort){
      //<------2.1 Multiple Sorting--------->
      const sortBy = this.queryStr.sort.split(',').join(' ');
      console.log(sortBy)
      this.query = this.query.sort(sortBy);
    }else{
      //<-----------2.2 Default sorting
      this.query = this.query.sort('-createdAt');
    };
    return this;
    }
  
    limit(){
      //<------------3. Field limiting-------------->
    if(this.queryStr.fields){
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }else{
    //<---------3.1 Default fields Sorting---------->
    this.query = this.query.select("-_v");
    };
    return this;
    }

    paginate(){
      //<--------4. Pagination------------->
    //http://localhost:3000/api/v1/tours?page=3&limit=10
    // Page 1, 1-10, Page 2, 11-20, Page 3, 21-30
  
    const page = this.queryStr.page *1 || 1;//Page =1,2,......
    const limit = this.queryStr.limit * 1 || 10;//limit = 10
    const skip = (page -1)*limit // if page3 page 3-1 * 10 skip->page2->11-20
    //excute query
    this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  
  };

  module.exports = APIFeatures;