'use client'
import axios from "axios";
import UploadIcon from "./UploadIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadForm() {

     const [isUploading, setIsUploading] = useState(false);

     const router = useRouter();

     async function upload(ev) {
          ev.preventDefault();
          const files = ev.target.files;
          if (files.length > 0) {
               const file = files[0];
               setIsUploading(true);
               try {
                    const ext = file.name.split('.').pop();
                    const type = file.type;
                    const { data } = await axios.get(`/api/upload?ext=${ext}&type=${type}`);
                    console.log(data);
                    const { presignedUrl, newName } = data;
            
                    // Upload file to S3 using the presigned URL
                    await axios.put(presignedUrl, file, {
                        headers: {
                            'Content-Type': file.type,
                        },
                    });
            
                    // Handle success, for example, redirecting after upload
                    router.push('/' + newName);
                } catch (err) {
                    console.error(err);
                    setIsUploading(false);
               }
          }
     }
     return (
          <>
               {
                    isUploading && (
                         <div className="bg-black/90 text-white fixed inset-0 flex items-center">
                              <div className="w-full text-center">
                                   <h2 className="text-4xl mb-4" >
                                        Uploading
                                   </h2>
                                   <h3 className="text-xl">
                                        Please wait...
                                   </h3>
                              </div>
                         </div>
                    )

               }
               <label className="bg-green-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 cursor-pointer">
                    <UploadIcon />
                    <span>  Choose Files
                    </span>
                    <input onChange={upload} type="file" className="hidden" />
               </label>
          </>

     )
}