import NextSalahAPI from '$lib/nextsalah_api/handler';
import { error } from '@sveltejs/kit';
import type { PageLoad , Actions } from './$types';

export const load: PageLoad = async () => {     

    return  {
        "title" : "Prayer Times",
    }

};


export const actions: Actions = {

    default: async ({ request }) => {
        // Convert FormData to JSON
        const formData = await request.formData();

        const source =  formData.get('source') as string;
        const prayertimes = new NextSalahAPI(source);

        // Convert formData to JSON
        let data = Object.fromEntries(formData.entries());
        if (Object.keys(data).length === 0) { 
            // Invalid data
            throw error(400, "Invalid data");
        }

        // Remove 'source' from data
        delete(data.source); 

        // Get prayer times
        const result = await prayertimes.getLocation(data as Record<string, any>);

        if (result instanceof Error) {
            throw error(400,  result.message );
        }



        
        // TODO: Save to DB
        
        // Return success
        return {
            status: 200,
            body: {
                success: true,
                message: "Prayer times saved successfully",
            }
        };
    }

}