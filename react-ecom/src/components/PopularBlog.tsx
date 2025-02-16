import { MessageCircle, ThumbsUp } from "lucide-react";

const PopularBlog = () =>{
const blog = [{
    title:"My Amazing Blog Title 1",
    author:"Jordan",
    likes:142,
    comment:44
},

{
    title:"My Amazing Blog Title 2",
    author:"Majanoobhai",
    likes:5225,
    comment:"5k"
},
{
    title:"My Amazing Blog Title 3",
    likes:4554,
    comment:25
}];

    return (
        <div className="bg-white p-5 w-[23rem] mt-4 border ml-1 rounded">
            <h2 className="text-xl font-bold mb-5">Popular Blog</h2>
            <ul>
                {blog.map((blog, index) =>(
                   <li key={index} className="mb-4">
                    <div className="flex justify-between items-center">
                        <span className="font-bold mb-2">{blog.title}</span>
                    </div>
                    <span className="text-gray-600">Publish by{blog.author}</span>
                    <div className="flex items-center mt-2">
                        <MessageCircle  size={16}/>
                        <span className="text-gray-500 mr-5 ml-1">{blog.likes}</span>

                        <ThumbsUp size={16}/>
                        <span className="text-ray-500 mr-2 ml-2">${blog.comment}</span>
                        
                    </div>
                   </li> 
                ))}
            </ul>
        </div>
    )
};
export default PopularBlog;