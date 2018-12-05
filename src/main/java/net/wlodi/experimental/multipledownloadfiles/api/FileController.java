package net.wlodi.experimental.multipledownloadfiles.api;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@WebServlet("/download")
public class FileController extends HttpServlet {

    private static final long serialVersionUID = -1738407244645836033L;

    @SuppressWarnings ( "unused" )
    private static final Logger LOGGER = LoggerFactory.getLogger( FileController.class );

    private static final int ARBITARY_SIZE = 1048;
    private static final String COOKIE_NAME = "DOWNLOAD"; 
    // private final int RESPONSE_DELAY = 150;
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
     
        String filename = request.getParameter("file");
        
        if(filename == null) {
            throw new IllegalArgumentException( "Parameter [file] is required." );
        }
        
        response.setContentType("application/pdf");
        response.setHeader("Content-disposition", "attachment; filename=" + filename);
        response.addCookie(new Cookie(COOKIE_NAME, "done-" + filename));
        
        try(InputStream in = FileController.class.getResourceAsStream("/" + filename);
          OutputStream out = response.getOutputStream()) {
 
            byte[] buffer = new byte[ARBITARY_SIZE];
         
            int numBytesRead;
            while ((numBytesRead = in.read(buffer)) > 0) {
                // Thread.sleep( RESPONSE_DELAY );
                out.write(buffer, 0, numBytesRead);
            }
        }
        /*catch ( InterruptedException e ) {
            e.printStackTrace();
        }*/
    }
}